import type { ReactNode, RefObject } from "react";

export interface FilterPopupProps {
  onApply: () => void;
  onClose: () => void;
  onFiltersButtonClick: () => void;
  title: string;
  onClearAll: () => void;
  selectedFiltersCount: number;
  appliedFiltersCount: number;
  filters: {
    title: string;
    component: ReactNode;
  }[];
  isOpen: boolean;
  boundaryRef?: RefObject<HTMLElement>;
  width?: number;
  className?: string;
}
