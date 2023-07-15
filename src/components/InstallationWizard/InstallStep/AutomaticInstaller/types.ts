export interface AutomaticInstallerProps {
  onManualInstallSelect: () => void;
  onGoToNextStep: () => void;
}

export enum Operation {
  INSTALL = "install",
  UNINSTALL = "uninstall",
  START = "start",
  STOP = "stop"
}
