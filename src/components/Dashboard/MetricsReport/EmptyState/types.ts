import { ReactNode } from "react";

export type EmptyStateType =
  | "noEndpoints"
  | "noServices"
  | "noData"
  | "loading";

export interface EmptyStateProps {
  type: EmptyStateType;
}

export interface EmptyStateContent {
  title: string;
  message: string;
  icon: ReactNode;
  customContent?: ReactNode;
}
