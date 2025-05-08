import type { Environment } from "../../../redux/services/types";

export interface EnvironmentInstructionsPanelProps {
  environment: Environment;
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
