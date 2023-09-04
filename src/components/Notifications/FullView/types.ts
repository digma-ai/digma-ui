import { NotificationsData, NotificationsError } from "../types";

export interface FullViewProps {
  data?: NotificationsData;
  error?: NotificationsError;
  showAll: boolean;
  page: number;
  pageSize: number;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
  onPageChange: (page: number) => void;
  onFilterChange: (showAll: boolean) => void;
  onClose: () => void;
}
