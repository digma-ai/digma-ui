import { AssetEntry, SORTING_CRITERION } from "../types";

export interface AssetEntryProps {
  entry: AssetEntry;
  onAssetLinkClick: (entry: AssetEntry) => void;
  sortingCriterion: SORTING_CRITERION;
  isImpactHidden: boolean;
  isOverallImpactHidden: boolean;
}

export interface ImpactScoreIndicatorProps {
  $score: number;
}
