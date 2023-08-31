import { InsightType } from "../../types";

type NotificationsViewMode = "popup" | "full";

export interface NotificationsProps {
  data?: NotificationsData;
  viewMode?: NotificationsViewMode;
}

export interface NotificationsData {
  notifications: Notification[];
  totalCount: number;
  unreadCount: number;
}

export interface Notification {
  notificationId: string;
  accountId: string;
  environment: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  data: {
    insightType: InsightType;
    codeObject: {
      displayName: string;
      codeObjectId: string;
    };
  };
  isRead: boolean;
}
