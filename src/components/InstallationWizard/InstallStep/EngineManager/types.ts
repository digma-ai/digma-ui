import { MemoExoticComponent } from "react";
import { IconProps } from "../../../common/icons/types";
import { AsyncActionStatus } from "../../types";

export interface EngineManagerProps {
  onManualInstallSelect?: () => void;
  onAutoInstallFinish?: () => void;
  onRemoveFinish?: () => void;
  onOperationStart?: () => void;
  onOperationFinish?: () => void;
  autoInstall?: boolean;
}

export enum Operation {
  INSTALL = "install",
  UNINSTALL = "uninstall",
  START = "start",
  STOP = "stop"
}

export interface CurrentOperation {
  operation: Operation;
  status: AsyncActionStatus;
  error?: string;
}

export interface FailedOperation {
  operation: Operation;
  error?: string;
}

export interface OperationInfo {
  action: string;
  button: {
    label: string;
    icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  };
  titleSuffix: string;
}
