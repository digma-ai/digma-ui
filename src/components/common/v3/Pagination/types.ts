export interface PaginationProps {
  itemsCount: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  extendedNavigation?: boolean;
  withDescription?: boolean;
}
