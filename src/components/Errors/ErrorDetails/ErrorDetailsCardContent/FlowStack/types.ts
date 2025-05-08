import type { ErrorFlowInfo } from "../../../../../redux/services/types";

export interface FlowProps {
  data: ErrorFlowInfo;
}

export interface ShowOnlyWorkspaceErrorStackTraceItemsPayload {
  value: boolean;
}
