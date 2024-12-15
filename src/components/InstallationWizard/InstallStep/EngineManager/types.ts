import type { MemoExoticComponent } from "react";
import type { IconProps } from "../../../common/icons/types";
import type { EngineState } from "../types";

export interface EngineManagerProps {
  onManualInstallSelect?: () => void;
  onOperationStart?: () => void;
  onOperationFinish?: () => void;
  isAutoInstallationFlow?: boolean;
  overlay?: boolean;
  engine: EngineState;
}

export interface OperationInfo {
  button: {
    label: string;
    icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  };
  titleSuffix: string;
}

export interface ContentContainerProps {
  $overlay?: boolean;
}
