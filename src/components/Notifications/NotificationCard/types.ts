import { Notification } from "../types";

export interface NotificationCardProps {
  data: Notification;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
}
