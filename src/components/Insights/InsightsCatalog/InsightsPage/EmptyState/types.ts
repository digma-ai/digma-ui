import type { EmptyStateProps as CommonEmptyStateProps } from "../../../../common/v3/EmptyState/types";

export type EmptyStatePreset =
  | "noDismissedData"
  | "noFilteredData"
  | "noSearchResults"
  | "noInsightsYet"
  | "noDataYet"
  | "noSpanDataYet"
  | "analyticsSelectAsset";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
