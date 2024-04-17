import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";
import { ExtendedEnvironment } from "../types";

export interface EnvironmentInstructionsPanelProps {
  environment: ExtendedEnvironment;
  onAddEnvironmentToRunConfig?: (environment: string) => void;
  onClose?: () => void;
}

export interface EnvironmentInstructionsPanelContent {
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  title: string;
  instrumentation: {
    title: string;
    content: JSX.Element;
  };
  run: {
    title: string;
    content: JSX.Element;
  };
}

export interface AddToConfigResult {
  environment: string;
  result: AddToRunConfigState | null;
}

export enum AddToRunConfigState {
  success = "success",
  failure = "failure"
}
