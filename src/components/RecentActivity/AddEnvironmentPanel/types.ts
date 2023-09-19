import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";
import { ExtendedEnvironment } from "../types";

export interface AddEnvironmentPanelProps {
  environment: ExtendedEnvironment;
  onAddEnvironmentToRunConfig?: () => void;
}

export interface AddEnvironmentPanelContent {
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
