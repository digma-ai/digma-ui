import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";

export type EmptyStatePreset =
  | "updateRequired"
  | "loading"
  | "noDataYet"
  | "noDataForAsset"
  | "noSearchResults"
  | "noChildAssets"
  | "noFilteredData"
  | "noData";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
