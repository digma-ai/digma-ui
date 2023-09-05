import {
  GoToInsightsPayload,
  NotificationsData,
  NotificationsError
} from "../types";

export interface FullViewProps {
  data?: NotificationsData;
  error?: NotificationsError;
  showAll: boolean;
  page: number;
  pageSize: number;
  onLinkClick: (codeObjectData: GoToInsightsPayload) => void;
  onPageChange: (page: number) => void;
  onFilterChange: (showAll: boolean) => void;
  onClose: () => void;
}
