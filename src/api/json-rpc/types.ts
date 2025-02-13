export type JSONRPCID = string | number | null;

export interface JSONRPCRequest {
  jsonrpc: "2.0";
  method: string;
  params?: unknown[] | Record<string, unknown>;
  id?: JSONRPCID;
}

export interface JSONRPCSuccessResponse {
  jsonrpc: "2.0";
  result: unknown;
  id: JSONRPCID;
}

export interface JSONRPCError {
  code: number;
  message: string;
  data?: unknown;
}

export interface JSONRPCErrorResponse {
  jsonrpc: "2.0";
  error: JSONRPCError;
  id: JSONRPCID;
}

export interface DigmaJSONRPCExtension {
  meta: {
    channel: "digma";
  };
}

export type DigmaJSONRPCRequest = JSONRPCRequest & DigmaJSONRPCExtension;

export type DigmaJSONRPCErrorResponse = JSONRPCErrorResponse &
  DigmaJSONRPCExtension;

export type DigmaJSONRPCSuccessResponse = JSONRPCSuccessResponse &
  DigmaJSONRPCExtension;
