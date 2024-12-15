import type { ReactNode } from "react";

export type TagType =
  | "highSeverity"
  | "mediumSeverity"
  | "lowSeverity"
  | "success"
  | "highlight"
  | "default";

export interface TagProps {
  content: ReactNode;
  type?: TagType;
  className?: string;
  title?: ReactNode;
}

export interface ContainerProps {
  $type?: TagType;
}
