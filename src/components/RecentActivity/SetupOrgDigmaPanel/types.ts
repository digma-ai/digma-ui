import { ExtendedEnvironment } from "../types";

export interface SetupOrgDigmaPanelProps {
  environment: ExtendedEnvironment;
  onFinish: (environment: string) => void;
  onCancel: (environment: string) => void;
}

export interface NotificationMessageProps {
  type: "success" | "failure";
}
