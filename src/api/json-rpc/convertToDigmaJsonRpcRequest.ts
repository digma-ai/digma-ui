import { isObject } from "../../typeGuards/isObject";
import type { DigmaOutgoingMessageData } from "../types";
import type { DigmaJSONRPCRequest } from "./types";

export const convertToDigmaJsonRpcRequest = (
  data: DigmaOutgoingMessageData<unknown>
): DigmaJSONRPCRequest => ({
  meta: {
    channel: "digma"
  },
  jsonrpc: "2.0",
  method: data.action,
  ...(isObject(data.payload) ? { params: data.payload } : {})
});
