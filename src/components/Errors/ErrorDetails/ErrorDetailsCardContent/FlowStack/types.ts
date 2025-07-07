import type { ErrorFlowInfo } from "../../../../../redux/services/types";

export interface FlowProps {
  data: ErrorFlowInfo;
  errorId: string;
}

export interface ShowOnlyWorkspaceErrorStackTraceItemsPayload {
  value: boolean;
}
