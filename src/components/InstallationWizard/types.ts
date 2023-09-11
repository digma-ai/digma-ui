export type AsyncActionResult = "success" | "failure";

export type AsyncActionStatus = AsyncActionResult | "pending" | undefined;

export interface AsyncActionResultData {
  result: AsyncActionResult;
  error?: string;
}

// export type InstallationType = "local" | "cloud";

export interface SetCurrentStepData {
  currentStep: string;
}
