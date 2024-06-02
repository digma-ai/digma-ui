import { FlowInfo } from "../types";

export interface FlowProps {
  data: FlowInfo;
}

export interface FrameItemCodeLocation {
  URI: string;
  lineNumber: number;
}

export interface ShowOnlyWorkspaceErrorStackTraceItemsPayload {
  value: boolean;
}
