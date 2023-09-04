import { Notification } from "../types";

export interface NotificationListProps {
  notifications: Notification[];
  onGoToSpan: (spanCodeObjectId: string) => void;
}
