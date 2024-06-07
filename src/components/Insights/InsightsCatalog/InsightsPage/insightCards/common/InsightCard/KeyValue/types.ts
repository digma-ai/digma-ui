import { ReactNode } from "react";

export interface KeyValueProps {
  label: ReactNode;
  info?: ReactNode;
  children: ReactNode;
  className?: string;
  title?: string;
}
