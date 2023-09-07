import {
  GoToInsightsPayload,
  NotificationsData,
  NotificationsError
} from "../types";

export interface RecentViewProps {
  data?: NotificationsData;
  error?: NotificationsError;
  onLinkClick: (codeObjectData: GoToInsightsPayload) => void;
  onGoToNotifications: () => void;
  onClose: () => void;
  isLoading: boolean;
}
