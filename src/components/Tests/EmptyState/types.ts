import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";

export type EmptyStatePreset =
  | "noData"
  | "noFilteredData"
  | "selectAsset"
  | "loading";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
