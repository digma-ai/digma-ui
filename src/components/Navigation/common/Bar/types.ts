import { HTMLAttributes, ReactNode } from "react";

export interface BarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}
