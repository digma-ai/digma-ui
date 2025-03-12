import type { ExtendedEnvironment } from "../types";

export interface EnvironmentInstructionsPanelProps {
  environment: ExtendedEnvironment;
  onAddEnvironmentToRunConfig?: (environment: string) => void;
  onClose?: () => void;
}

export interface AddToConfigResult {
  environment: string;
  result: AddToRunConfigState | null;
}

export enum AddToRunConfigState {
  Success = "success",
  Failure = "failure"
}
