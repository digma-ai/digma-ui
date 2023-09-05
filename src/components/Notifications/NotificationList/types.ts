import { GoToInsightsPayload, Notification } from "../types";

export interface NotificationListProps {
  notifications: Notification[];
  onGoToInsights: (codeObjectData: GoToInsightsPayload) => void;
}
