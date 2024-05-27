export interface CarouselPaginationProps {
  itemsCount: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  trackingEventPrefix?: string;
}

export interface PageButtonProps {
  $isActive: boolean;
}
