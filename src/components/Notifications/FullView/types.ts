import { Notification } from "../types";

export interface FullViewProps {
  data?: {
    notifications: Notification[];
    totalCount: number;
    unreadCount: number;
  };
  showAll: boolean;
  page: number;
  pageSize: number;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
  onPageChange: (page: number) => void;
  onFilterChange: (showAll: boolean) => void;
  onClose: () => void;
}
