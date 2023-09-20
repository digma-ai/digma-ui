import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";
import { ExtendedEnvironment } from "../types";

export interface EnvironmentInstructionsPanelProps {
  environment: ExtendedEnvironment;
  onAddEnvironmentToRunConfig?: (environment: string) => void;
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
  };
}
