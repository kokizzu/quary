/* eslint-disable camelcase */
import { Err, isErr, Ok, Result } from '@shared/result'
import { Uri } from 'vscode'
import {
  RustWithDatabaseServiceClientImpl,
  RustWithoutDatabaseServiceClientImpl,
} from '@quary/proto/quary/service/v1/wasm_rust_rpc_calls'
import { ConnectionConfig } from '@quary/proto/quary/service/v1/connection_config'
import { TestResults } from '@quary/proto/quary/service/v1/test_results'
import { Project } from '@quary/proto/quary/service/v1/project'
import {
  add_limit_to_select,
  clean_up,
  initSync,
  rpc_wrapper_with_database,
  rpc_wrapper_without_database,
  run_model_tests,
  run_tests,
} from '../rust_wasm/quary_wasm_bindgen'
import { ServicesFiles } from './servicesFiles'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const wasm = require('../rust_wasm/quary_wasm_bindgen_bg.wasm')

const init = () => {
  const wasmString1 = wasm.slice('data:application/wasm;base64,'.length)
  const wasmArray = Uint8Array.from(atob(wasmString1), (c) => c.charCodeAt(0))

  initSync(wasmArray)
}

export const rustWithDatabaseWasmServices = (
  projectConfig: ConnectionConfig,
  files: ServicesFiles,
) => {
  init()

  const writefunc = returnWriterFunc(files)
  const fileReader = returnReaderFunc(files)
  const filesLister = returnFileLister(files)

  const rpc = {
    request: async (
      _: string,
      method: string,
      data: Uint8Array,
    ): Promise<Uint8Array> => {
      const config = ConnectionConfig.encode(projectConfig).finish()
      return rpc_wrapper_with_database(
        method,
        config,
        writefunc,
        fileReader,
        filesLister,
        data,
      )
    },
  }
  const client = new RustWithDatabaseServiceClientImpl(rpc)
  return {
    parse_project: wrapper(client.ParseProject),
    render_schema: wrapper(client.RenderSchema),
    list_assets: wrapper(client.ListAssets),
    return_sql_for_seeds_and_models: wrapper(client.ReturnSQLForSeedsAndModels),
    return_full_sql_for_asset: wrapper(client.ReturnFullSqlForAsset),
    getModelTable: wrapper(client.GetModelTable),
    createModelSchemaEntry: wrapper(client.CreateModelSchemaEntry),
    updateAssetDescription: wrapper(client.UpdateAssetDescription),
    updateModelSourceColumnDescription: wrapper(
      client.UpdateModelOrSourceColumnDescription,
    ),
    addColumnToModelOrSource: wrapper(client.AddColumnToModelOrSource),
    addColumnTestToModelOrSourceColumnRequest: wrapper(
      client.AddColumnTestToModelOrSourceColumn,
    ),
    returnDefinitionLocationsForSQL: wrapper(
      client.ReturnDefinitionLocationsForSQL,
    ),
    removeColumnTestFromModelOrSourceColumnRequest: wrapper(
      client.RemoveColumnTestFromModelOrSourceColumn,
    ),
    generateSourceFiles: wrapper(client.GenerateSourceFiles),
    run_test: async (
      test_runner: 'skip' | 'all',
      project: Project,
      run_statement: (statement: string) => Promise<boolean>,
      project_root: string,
    ): Promise<TestResults> => {
      const projectProto = Project.encode(project).finish()
      if (projectConfig === undefined) {
        throw Error(
          'should not happen, project config shold be defined for tests',
        )
      }
      const output = await run_tests(
        test_runner,
        ConnectionConfig.encode(projectConfig).finish(),
        projectProto,
        fileReader,
        filesLister,
        run_statement,
        project_root,
      )
      return TestResults.decode(output)
    },
    run_model_test: async (
      project: Project,
      run_statement: (statement: string) => Promise<boolean>,
      model_name: string,
      whether_to_include_model_to_source: boolean,
    ): Promise<TestResults> => {
      const projectProto = Project.encode(project).finish()
      if (projectConfig === undefined) {
        throw Error(
          'should not happen, project config should be defined for tests',
        )
      }
      const output = await run_model_tests(
        ConnectionConfig.encode(projectConfig).finish(),
        projectProto,
        fileReader,
        filesLister,
        run_statement,
        model_name,
        whether_to_include_model_to_source,
      )
      return TestResults.decode(output)
    },
  }
}

const wrapper = function <Req, Res>(
  fn: (request: Req) => Promise<Res>,
): (req: Req) => Promise<Result<Res>> {
  return async (request: Req): Promise<Result<Res>> => {
    try {
      return Ok(await fn(request))
    } catch (e) {
      return Err(e as Error)
    }
  }
}

export const rustWithoutDatabaseWasmServices = (files: ServicesFiles) => {
  init()

  const writefunc = returnWriterFunc(files)
  const fileReader = returnReaderFunc(files)
  const filesLister = returnFileLister(files)

  const rpc = {
    request: async (
      _: string,
      method: string,
      data: Uint8Array,
    ): Promise<Uint8Array> =>
      rpc_wrapper_without_database(
        method,
        writefunc,
        fileReader,
        filesLister,
        data,
      ),
  }
  const client = new RustWithoutDatabaseServiceClientImpl(rpc)
  return {
    init_files: wrapper(client.InitFiles),
    is_path_empty: wrapper(client.IsPathEmpty),
    get_project_config: wrapper(client.GetProjectConfig),
    generate_project_files: wrapper(client.GenerateProjectFiles),
    stringify_project_file: wrapper(client.StringifyProjectFile),
    add_limit_to_select,
    clean_up,
  }
}

/**
 * This function is used to return a function that can be used to write files. If the locatin asked to be written to is
 * not in the project root, then an error is thrown.
 *
 * If the location is in the project root and within a directory that exists, then the file is written to that location.
 * If the location in the project root and the directory does not exist, then the directory is created and the file is
 * written to that location.
 *
 * @param files
 */
const returnWriterFunc =
  (files: ServicesFiles) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (location: string, data: Uint8Array): Promise<void> => {
    const projectRoot = files.getProjectRoot()
    if (isErr(projectRoot)) {
      throw new Error(`error getting project root: ${projectRoot.error}`)
    }
    // TODO Quick fix that needs to be fixed properly. The location is not always a valid path.
    if (location.startsWith(projectRoot.value.path)) {
      location = location.substring(projectRoot.value.path.length)
    }
    const uri = Uri.joinPath(projectRoot.value, location)
    // check if not in project root
    if (!uri.fsPath.startsWith(projectRoot.value.fsPath)) {
      throw new Error(
        `cannot write file to location ${location} because it is not in the project root`,
      )
    }
    // check if the directory exists
    let directory = uri.path.substring(
      0,
      uri.path.lastIndexOf('/') === -1 ? 0 : uri.path.lastIndexOf('/'),
    )
    if (directory.startsWith(projectRoot.value.path)) {
      directory = directory.substring(projectRoot.value.path.length)
    }
    const directoryURI = Uri.joinPath(projectRoot.value, directory)
    const directoryForCreation = projectRoot.value.with({
      path: directoryURI.path,
    })
    await files.createDirectory(directoryForCreation)
    return files.writeFile(uri, data)
  }

const returnReaderFunc =
  (files: ServicesFiles) =>
  async (location: string): Promise<Uint8Array> => {
    const projectRoot = files.getProjectRoot()
    if (isErr(projectRoot)) {
      throw new Error(`error getting project root: ${projectRoot.error}`)
    }
    if (location.startsWith(projectRoot.value.path)) {
      const out = Uri.joinPath(
        projectRoot.value,
        location.substring(projectRoot.value.path.length),
      )
      return files.readFile(out)
    }
    const uri = Uri.joinPath(projectRoot.value, location)
    return files.readFile(uri)
  }

const returnFileLister =
  (files: ServicesFiles) =>
  async (location: string): Promise<string[]> => {
    const returnedValues = await files.listAllFiles()
    if (isErr(returnedValues)) {
      throw new Error(`error getting list of files: ${returnedValues.error}`)
    }
    const projectRoot = files.getProjectRoot()
    if (isErr(projectRoot)) {
      throw new Error(`error getting project root: ${projectRoot.error}`)
    }
    const allFiles = returnedValues.value
    const filtered = allFiles.filter((file) => file.path.startsWith(location))
    return filtered.map((value) =>
      value.path.substring(projectRoot.value.path.length),
    )
  }