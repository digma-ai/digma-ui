import type { ReactNode } from "react";

export interface SectionProps {
  title: string;
  number: number;
  children: ReactNode;
  isExpanded: boolean;
}
