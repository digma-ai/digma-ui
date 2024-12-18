import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";

export type EmptyStatePreset =
  | "noData"
  | "noSearchResults"
  | "noFilteredData"
  | "noDismissedData"
  | "selectAsset"
  | "loading";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
