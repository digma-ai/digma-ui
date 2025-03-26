import { isObject } from "../../typeGuards/isObject";
import type { DigmaJSONRPCRequest } from "./types";

export const isDigmaJsonRpcRequest = (
  e: MessageEvent
): e is MessageEvent<DigmaJSONRPCRequest> =>
  isObject(e.data) &&
  e.data.jsonrpc === "2.0" &&
  isObject(e.data.meta) &&
  e.data.meta.channel === "digma";
