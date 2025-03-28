import type { SpanInfo } from "../../redux/services/types";
import type { InsightType } from "../../types";
import type { InsightScope } from "../Insights/types";

export type NotificationsViewMode = "popup" | "full";

export interface NotificationsProps {
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

export interface InsightNotificationData {
  insightType: InsightType;
  scope: InsightScope;
  codeObjectId: string;
  spanInfo?: SpanInfo;
}

export interface Notification {
  notificationId: string;
  accountId: string;
  environment: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  data: InsightNotificationData;
  isRead: boolean;
}

export interface CodeObjectData {
  spanCodeObjectId?: string;
  methodCodeObjectId?: string;
}
