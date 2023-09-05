import { GoToInsightsPayload, Notification } from "../types";

export interface NotificationCardProps {
  data: Notification;
  onLinkClick: (codeObjectData: GoToInsightsPayload) => void;
}
