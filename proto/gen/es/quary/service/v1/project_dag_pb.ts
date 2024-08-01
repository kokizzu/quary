// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file quary/service/v1/project_dag.proto (package quary.service.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file quary/service/v1/project_dag.proto.
 */
export const file_quary_service_v1_project_dag: GenFile = /*@__PURE__*/
  fileDesc("CiJxdWFyeS9zZXJ2aWNlL3YxL3Byb2plY3RfZGFnLnByb3RvEhBxdWFyeS5zZXJ2aWNlLnYxIloKClByb2plY3REYWcSJQoFbm9kZXMYASADKAsyFi5xdWFyeS5zZXJ2aWNlLnYxLk5vZGUSJQoFZWRnZXMYAiADKAsyFi5xdWFyeS5zZXJ2aWNlLnYxLkVkZ2UiJQoETm9kZRIKCgJpZBgBIAEoCRIRCglpc19jYWNoZWQYAiABKAgiIAoERWRnZRIKCgJ0bxgBIAEoCRIMCgRmcm9tGAIgASgJQgJQAWIGcHJvdG8z");

/**
 * DirectedAcyclicGraph represents a directed acyclic graph that is used to visualize the project dependencies in a
 * project.
 *
 * @generated from message quary.service.v1.ProjectDag
 */
export type ProjectDag = Message<"quary.service.v1.ProjectDag"> & {
  /**
   * @generated from field: repeated quary.service.v1.Node nodes = 1;
   */
  nodes: Node[];

  /**
   * @generated from field: repeated quary.service.v1.Edge edges = 2;
   */
  edges: Edge[];
};

/**
 * Describes the message quary.service.v1.ProjectDag.
 * Use `create(ProjectDagSchema)` to create a new message.
 */
export const ProjectDagSchema: GenMessage<ProjectDag> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_project_dag, 0);

/**
 * @generated from message quary.service.v1.Node
 */
export type Node = Message<"quary.service.v1.Node"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: bool is_cached = 2;
   */
  isCached: boolean;
};

/**
 * Describes the message quary.service.v1.Node.
 * Use `create(NodeSchema)` to create a new message.
 */
export const NodeSchema: GenMessage<Node> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_project_dag, 1);

/**
 * @generated from message quary.service.v1.Edge
 */
export type Edge = Message<"quary.service.v1.Edge"> & {
  /**
   * @generated from field: string to = 1;
   */
  to: string;

  /**
   * @generated from field: string from = 2;
   */
  from: string;
};

/**
 * Describes the message quary.service.v1.Edge.
 * Use `create(EdgeSchema)` to create a new message.
 */
export const EdgeSchema: GenMessage<Edge> = /*@__PURE__*/
  messageDesc(file_quary_service_v1_project_dag, 2);

