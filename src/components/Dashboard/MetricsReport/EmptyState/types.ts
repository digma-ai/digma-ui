import type { EmptyStateProps as CommonEmptyStateProps } from "../../../common/v3/EmptyState/types";

export type EmptyStatePreset =
  | "noEndpoints"
  | "noServices"
  | "noData"
  | "loading";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
