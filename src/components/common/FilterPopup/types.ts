import { ReactNode } from "react";

export interface FilterPopupProps {
  onApply: () => void;
  onClose: () => void;
  title: string;
  onClearAll: () => void;
  selectedFiltersCount: number;
  filters: {
    title: string;
    component: ReactNode;
  }[];
  onStateChange?: (state: boolean) => void;
}
