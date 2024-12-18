import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: ReactNode;
  customContent?: ReactNode;
}
