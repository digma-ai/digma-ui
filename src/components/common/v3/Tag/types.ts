import React from "react";

export type TagType =
  | "highSeverity"
  | "mediumSeverity"
  | "lowSeverity"
  | "success"
  | "highlight"
  | "default";

export interface TagProps {
  content: React.ReactNode;
  type?: TagType;
  className?: string;
}

export interface ContainerProps {
  $type?: TagType;
}
