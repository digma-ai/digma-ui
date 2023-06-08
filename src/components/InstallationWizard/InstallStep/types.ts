import { ConnectionCheckStatus } from "../types";

export interface InstallStepProps {
  connectionCheckStatus: ConnectionCheckStatus;
  onConnectionStatusCheck: () => void;
  onResetConnectionCheckStatus: () => void;
  onGetDigmaDockerDesktopButtonClick: () => void;
  onInstallTabSelect: (tabName: string) => void;
  onGoToNextStep: () => void;
  slackChannelURL: string;
}
