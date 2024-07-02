import { CodeObjectData, Notification } from "../types";

export interface NotificationListProps {
  notifications: Notification[];
  onLinkClick: (codeObjectData: CodeObjectData) => void;
}
