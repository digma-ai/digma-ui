export type AsyncActionResult = "success" | "failure";

export type AsyncActionStatus = AsyncActionResult | "pending" | undefined;

export interface AsyncActionResultData {
  result: AsyncActionResult;
  error?: string;
}

export type InstallationType = "local" | "cloud";

export interface SetCurrentStepData {
  currentStep: string;
}

export interface FinishStepFooterContentProps {
  $transitionClassName: string;
  $transitionDuration: number;
}

export interface FieldValidationResult {
  isValid?: boolean;
  error?: string;
}

export type FieldsErrors = Record<string, string | undefined>;
