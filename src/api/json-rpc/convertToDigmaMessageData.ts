import type { DigmaIncomingMessageData } from "../types";
import type { DigmaJSONRPCRequest } from "./types";

export const convertToDigmaMessageData = (
  data: DigmaJSONRPCRequest
): DigmaIncomingMessageData => ({
  type: "digma",
  action: data.method,
  ...(data.params ? { payload: data.params } : {})
});
