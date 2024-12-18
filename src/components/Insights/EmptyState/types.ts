import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";

export type EmptyStatePreset =
  | "nothingToShow"
  | "noDataYet"
  | "loading"
  | "noInsights"
  | "processing"
  | "noObservability";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
