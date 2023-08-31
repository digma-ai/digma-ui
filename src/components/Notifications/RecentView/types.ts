import { Notification } from "../types";

export interface RecentViewProps {
  data?: {
    notifications: Notification[];
    totalCount: number;
    unreadCount: number;
  };
  onSpanLinkClick: (spanCodeObjectId: string) => void;
  onGoToNotifications: () => void;
  onClose: () => void;
}
