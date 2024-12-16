import type { ReactNode } from "react";

export interface SectionProps {
  title?: string;
  toolbarContent?: ReactNode;
  children: ReactNode;
}
