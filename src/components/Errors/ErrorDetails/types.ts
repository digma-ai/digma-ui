import { ErrorScoreInfo } from "../types";

export interface ErrorDetailsProps {
  id: string;
  onGoToAllErrors: () => void;
}

export interface GetErrorDetailsPayload {
  errorId: string;
}

export interface ServiceInfo {
  serviceName: string | null;
}

export interface Frame {
  moduleName: string | null;
  functionName: string | null;
  lineNumber: number;
  executedCode: string | null;
  codeObjectId: string | null;
  parameters: ({
    paramName: string;
    alwaysNoneValue: boolean;
  } | null)[];
  repeat: number;
  spanName: string | null;
  spanKind: string | null;
  moduleLogicalPath: string | null;
  modulePhysicalPath: string | null;
  className: string | null;
}

export interface FrameStack {
  exceptionType: string | null;
  frames: (Frame | null)[];
  exceptionMessage: string | null;
}

export interface FlowInfo {
  frameStacks: (FrameStack | null)[];
  stackTrace: string | null;
  lastInstanceCommitId: string | null;
  latestTraceId: string | null;
}

export interface ErrorDetails {
  name: string | null;
  sourceCodeObjectId: string | null;
  latestTraceId: string | null;
  firstOccurenceTime: string;
  lastOccurenceTime: string;
  dayAvg: number | null;
  scoreInfo: ErrorScoreInfo;
  errors: (FlowInfo | null)[];
  originServices: (ServiceInfo | null)[];
}

export interface SetErrorDetailsPayload {
  details: ErrorDetails;
}

export interface GoToTracePayload {
  traceId: string;
  spanName: string;
  spanCodeObjectId?: string;
}

export interface OpenRawErrorStackTraceInEditorPayload {
  stackTrace: string;
}

export interface GoToCodeLocationPayload {
  URI: string;
  lineNumber: number;
  lastInstanceCommitId: string | null;
}

export interface GetFilesURIsPayload {
  codeObjectIds: string[];
}

export type FilesURIsMap = Record<string, string>;

export interface SetFilesURIsPayload {
  filesURIs: FilesURIsMap;
}
