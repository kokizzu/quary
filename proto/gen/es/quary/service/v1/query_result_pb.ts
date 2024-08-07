// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file quary/service/v1/query_result.proto (package quary.service.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file quary/service/v1/query_result.proto.
 */
export const file_quary_service_v1_query_result: GenFile = /*@__PURE__*/
  fileDesc("CiNxdWFyeS9zZXJ2aWNlL3YxL3F1ZXJ5X3Jlc3VsdC5wcm90bxIQcXVhcnkuc2VydmljZS52MSJDCgtRdWVyeVJlc3VsdBI0Cgdjb2x1bW5zGAEgAygLMiMucXVhcnkuc2VydmljZS52MS5RdWVyeVJlc3VsdENvbHVtbiJNChFRdWVyeVJlc3VsdENvbHVtbhIMCgRuYW1lGAEgASgJEhEKBHR5cGUYAyABKAlIAIgBARIOCgZ2YWx1ZXMYAiADKAlCBwoFX3R5cGVCAlABYgZwcm90bzM");

/**
 * QueryResult is the result of a ran query.
 *
 * @generated from message quary.service.v1.QueryResult
 */
export type QueryResult = Message<"quary.service.v1.QueryResult"> & {
  /**
   * @generated from field: repeated quary.service.v1.QueryResultColumn columns = 1;
   */
  columns: QueryResultColumn[];
};

/**
 * Describes the message quary.service.v1.QueryResult.
 * Use `create(QueryResultSchema)` to create a new message.
 */
export const QueryResultSchema: GenMessage<QueryResult> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_query_result, 0);

/**
 * @generated from message quary.service.v1.QueryResultColumn
 */
export type QueryResultColumn = Message<"quary.service.v1.QueryResultColumn"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: optional string type = 3;
   */
  type?: string;

  /**
   * @generated from field: repeated string values = 2;
   */
  values: string[];
};

/**
 * Describes the message quary.service.v1.QueryResultColumn.
 * Use `create(QueryResultColumnSchema)` to create a new message.
 */
export const QueryResultColumnSchema: GenMessage<QueryResultColumn> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_query_result, 1);

