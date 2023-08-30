import { InsightType } from "../../types";

export interface NotificationsProps {
  data?: NotificationsData;
}

export interface NotificationsData {
  notifications: Notification[];
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
