export interface GetErrorsDataPayload {
  spanCodeObjectId?: string;
  methodId?: string;
}

export interface ErrorScoreInfo {
  score: number;
  scoreParams: Record<string, string> | null;
}

export interface Error {
  uid: string;
  name: string | null;
  scoreInfo: ErrorScoreInfo;
  codeObjectId: string | null;
  sourceCodeObjectId: string | null;
  characteristic: string | null;
  startsHere: boolean;
  endsHere: boolean;
  latestTraceId: string | null;
  firstOccurenceTime: string;
  lastOccurenceTime: string;
}

export interface SetErrorsDataPayload {
  errors: Error[];
}
