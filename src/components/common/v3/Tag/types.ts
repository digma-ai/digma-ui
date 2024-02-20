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
}

export interface ContainerProps {
  $type?: TagType;
}
