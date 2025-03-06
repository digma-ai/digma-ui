import type {
  AssetEntry,
  SORTING_CRITERION
} from "../../../../redux/services/types";

export interface AssetEntryProps {
  entry: AssetEntry;
  onAssetLinkClick: (entry: AssetEntry) => void;
  sortingCriterion: SORTING_CRITERION;
  isImpactHidden: boolean;
}

export interface InsightIconContainerProps {
  $criticality: number;
}
