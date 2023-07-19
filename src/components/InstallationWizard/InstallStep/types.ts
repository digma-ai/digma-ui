import { AsyncActionStatus } from "../types";

export interface InstallStepProps {
  connectionCheckStatus: AsyncActionStatus;
  onConnectionStatusCheck: () => void;
  onResetConnectionCheckStatus: () => void;
  onGetDigmaDockerDesktopButtonClick: () => void;
  onInstallTabSelect: (tabName: string) => void;
  onGoToNextStep: () => void;
  onSlackLinkClick: () => void;
}
