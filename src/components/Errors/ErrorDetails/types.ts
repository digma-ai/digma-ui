export interface ErrorDetailsProps {
  id: string;
  onGoToAllErrors: () => void;
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
