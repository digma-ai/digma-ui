import { ConnectionCheckStatus } from "../types";

export interface InstallStepProps {
  connectionCheckStatus: ConnectionCheckStatus;
  onConnectionStatusCheck: () => void;
  onResetConnectionCheckStatus: () => void;
  onGetDigmaDockerDesktopButtonClick: () => void;
  onGoToNextStep: () => void;
}
