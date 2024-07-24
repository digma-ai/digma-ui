import { ReactNode } from "react";

export type FilterType = "all" | "unread" | "critical";

export interface FilterChipComponentProps {
  disabled?: boolean;
  $selected?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export interface FilterChipProps {
  disabled?: boolean;
  selected?: boolean;
  onClick: () => void;
  type: FilterType;
  count?: number;
}
