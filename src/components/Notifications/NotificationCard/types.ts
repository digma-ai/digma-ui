import { CodeObjectData, Notification } from "../types";

export interface NotificationCardProps {
  data: Notification;
  onLinkClick: (codeObjectData: CodeObjectData) => void;
}
