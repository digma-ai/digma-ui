import {
  CodeObjectData,
  NotificationsData,
  NotificationsError
} from "../types";

export interface RecentViewProps {
  data?: NotificationsData;
  error?: NotificationsError;
  onLinkClick: (codeObjectData: CodeObjectData) => void;
  onGoToNotifications: () => void;
  onClose: () => void;
  isLoading: boolean;
}
