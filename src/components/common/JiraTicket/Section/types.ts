import type { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  title: string;
  errorMessage?: string;
  selectable?: boolean;
}

export interface ContainerProps {
  $selectable?: boolean;
}
