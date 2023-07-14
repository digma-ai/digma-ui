export type AsyncActionResult = "success" | "failure";

export type AsyncActionStatus = AsyncActionResult | "pending" | undefined;

export interface AsyncActionResultData {
  result: AsyncActionResult;
}

export type InstallationType = "local" | "cloud";
