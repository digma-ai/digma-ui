import { ReactNode } from "react";

export interface ReportCardProps {
  header: ReactNode;
  content: ReactNode;
  buttons?: ReactNode[];
  className?: string;
  title?: ReactNode;
  showTitle?: boolean;
}
