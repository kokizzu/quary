// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file quary/service/v1/chart_file.proto (package quary.service.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_struct } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file quary/service/v1/chart_file.proto.
 */
export const file_quary_service_v1_chart_file: GenFile = /*@__PURE__*/
  fileDesc("CiFxdWFyeS9zZXJ2aWNlL3YxL2NoYXJ0X2ZpbGUucHJvdG8SEHF1YXJ5LnNlcnZpY2UudjEihwIKCUNoYXJ0RmlsZRIYCgtkZXNjcmlwdGlvbhgCIAEoCUgBiAEBEgwKBHRhZ3MYAyADKAkSEQoHcmF3X3NxbBgEIAEoCUgAEhsKEXByZV90ZW1wbGF0ZWRfc3FsGAUgASgJSAASPwoJcmVmZXJlbmNlGAYgASgLMioucXVhcnkuc2VydmljZS52MS5DaGFydEZpbGUuQXNzZXRSZWZlcmVuY2VIABInCgZjb25maWcYByABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0Gh4KDkFzc2V0UmVmZXJlbmNlEgwKBG5hbWUYASABKAlCCAoGc291cmNlQg4KDF9kZXNjcmlwdGlvbkICUAFiBnByb3RvMw", [file_google_protobuf_struct]);

/**
 * CharFile is a representation of a chart that can be used to generate a visualization.
 *
 * @generated from message quary.service.v1.ChartFile
 */
export type ChartFile = Message<"quary.service.v1.ChartFile"> & {
  /**
   * description of the cart
   *
   * @generated from field: optional string description = 2;
   */
  description?: string;

  /**
   * Tags are used to group different parts of the project together. For example, you could tag all models that are
   * related to a specific department with the same tag.
   *
   * @generated from field: repeated string tags = 3;
   */
  tags: string[];

  /**
   * Where the data comes from
   *
   * @generated from oneof quary.service.v1.ChartFile.source
   */
  source: {
    /**
     * raw sql that is passed to the database
     *
     * @generated from field: string raw_sql = 4;
     */
    value: string;
    case: "rawSql";
  } | {
    /**
     * sql that is passed to the database with templating through quary
     *
     * @generated from field: string pre_templated_sql = 5;
     */
    value: string;
    case: "preTemplatedSql";
  } | {
    /**
     * reference to a pre-existing asset, model, source, seed, snapshot
     *
     * @generated from field: quary.service.v1.ChartFile.AssetReference reference = 6;
     */
    value: ChartFile_AssetReference;
    case: "reference";
  } | { case: undefined; value?: undefined };

  /**
   * Configuration for the chart that is passed to perspective
   *
   * @generated from field: google.protobuf.Struct config = 7;
   */
  config?: JsonObject;
};

/**
 * Describes the message quary.service.v1.ChartFile.
 * Use `create(ChartFileSchema)` to create a new message.
 */
export const ChartFileSchema: GenMessage<ChartFile> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_chart_file, 0);

/**
 * @generated from message quary.service.v1.ChartFile.AssetReference
 */
export type ChartFile_AssetReference = Message<"quary.service.v1.ChartFile.AssetReference"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * Describes the message quary.service.v1.ChartFile.AssetReference.
 * Use `create(ChartFile_AssetReferenceSchema)` to create a new message.
 */
export const ChartFile_AssetReferenceSchema: GenMessage<ChartFile_AssetReference> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_chart_file, 0, 0);

