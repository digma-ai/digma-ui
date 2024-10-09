import { ReactNode } from "react";

export type EmptyStateType =
  | "noEndpoints"
  | "noServices"
  | "noData"
  | "loading";

export interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  message?: string;
  icon?: ReactNode;
  customContent?: ReactNode;
}

export interface EmptyStateContent {
  title: string;
  message: string;
  icon: ReactNode;
  customContent?: ReactNode;
}
