import type { ReactNode } from "react";

export interface CardProps {
  header: ReactNode;
  content: ReactNode;
  buttons?: ReactNode[];
  className?: string;
  title?: ReactNode;
  showTitle?: boolean;
}
