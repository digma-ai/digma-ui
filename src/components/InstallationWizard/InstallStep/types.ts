import type { AsyncActionStatus } from "../types";

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

export interface InstallStepProps {
  // connectionCheckStatus: AsyncActionStatus;
  // onConnectionStatusCheck: () => void;
  // onResetConnectionCheckStatus: () => void;
  onGetDigmaDockerDesktopButtonClick: () => void;
  onInstallTabSelect: (tabName: string) => void;
  onGoToNextStep: (isAutomatic?: boolean) => void;
  onSlackLinkClick: () => void;
}

export interface TabContentContainerProps {
  $overlay?: boolean;
}

export interface EngineState {
  currentOperation?: CurrentOperation;
  failedOperation?: FailedOperation;
  startOperation: (operation: Operation) => void;
}
