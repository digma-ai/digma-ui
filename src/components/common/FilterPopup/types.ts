import { ReactNode } from "react";

export interface FilterPopupProps {
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
