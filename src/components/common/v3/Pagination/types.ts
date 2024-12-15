import type { ReactNode } from "react";

export interface PaginationProps {
  itemsCount: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  extendedNavigation?: boolean;
  withDescription?: boolean;
  trackingEventPrefix?: string;
  children?: ReactNode;
}
