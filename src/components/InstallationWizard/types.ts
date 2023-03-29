export type ConnectionCheckResult = "success" | "failure";

export type ConnectionCheckStatus =
  | ConnectionCheckResult
  | "pending"
  | undefined;

export interface ConnectionCheckResultData {
  result: ConnectionCheckResult;
}
