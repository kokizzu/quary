// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file quary/service/v1/column_description.proto (package quary.service.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message quary.service.v1.ColumnDescription
 */
export class ColumnDescription extends Message<ColumnDescription> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: optional string description = 2;
   */
  description?: string;

  /**
   * @generated from field: repeated string tests = 3;
   */
  tests: string[] = [];

  constructor(data?: PartialMessage<ColumnDescription>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "quary.service.v1.ColumnDescription";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "tests", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ColumnDescription {
    return new ColumnDescription().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ColumnDescription {
    return new ColumnDescription().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ColumnDescription {
    return new ColumnDescription().fromJsonString(jsonString, options);
  }

  static equals(a: ColumnDescription | PlainMessage<ColumnDescription> | undefined, b: ColumnDescription | PlainMessage<ColumnDescription> | undefined): boolean {
    return proto3.util.equals(ColumnDescription, a, b);
  }
}

