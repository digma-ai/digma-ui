import { InsightType } from "../../types";

type NotificationsViewMode = "popup" | "full";

export interface NotificationsProps {
  data?: NotificationsSetDataPayload;
  viewMode?: NotificationsViewMode;
}

export interface NotificationsSetDataPayload {
  data: NotificationsData | null;
  error: NotificationsError | null;
}

export interface NotificationsData {
  notifications: Notification[];
  totalCount: number;
  unreadCount: number;
}

export interface NotificationsError {
  message: string;
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
