import { NotificationsData, NotificationsError } from "../types";

export interface RecentViewProps {
  data?: NotificationsData;
  error?: NotificationsError;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
  onGoToNotifications: () => void;
  onClose: () => void;
}
