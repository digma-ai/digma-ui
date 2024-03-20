import { ReactNode } from "react";

export interface CardProps {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}
