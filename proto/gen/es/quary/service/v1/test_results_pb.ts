// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file quary/service/v1/test_results.proto (package quary.service.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { TestResult } from "./test_result_pb";
import { file_quary_service_v1_test_result } from "./test_result_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file quary/service/v1/test_results.proto.
 */
export const file_quary_service_v1_test_results: GenFile = /*@__PURE__*/
  fileDesc("CiNxdWFyeS9zZXJ2aWNlL3YxL3Rlc3RfcmVzdWx0cy5wcm90bxIQcXVhcnkuc2VydmljZS52MSI8CgtUZXN0UmVzdWx0cxItCgdyZXN1bHRzGAEgAygLMhwucXVhcnkuc2VydmljZS52MS5UZXN0UmVzdWx0QgJQAWIGcHJvdG8z", [file_quary_service_v1_test_result]);

/**
 * WasmRunTestResponse is a temporary message type to work on inferring in Rust rather than in Typescript.
 * The goal is to make better interfaces over time.
 *
 * @generated from message quary.service.v1.TestResults
 */
export type TestResults = Message<"quary.service.v1.TestResults"> & {
  /**
   * @generated from field: repeated quary.service.v1.TestResult results = 1;
   */
  results: TestResult[];
};

/**
 * Describes the message quary.service.v1.TestResults.
 * Use `create(TestResultsSchema)` to create a new message.
 */
export const TestResultsSchema: GenMessage<TestResults> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_test_results, 0);

