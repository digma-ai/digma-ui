import type {
  AssetRecordItemRead,
  AssetsSortingCriterion
} from "../../../../redux/services/types";

export interface AssetEntryProps {
  entry: AssetRecordItemRead;
  onAssetLinkClick: (entry: AssetRecordItemRead) => void;
  sortingCriterion: AssetsSortingCriterion;
  isImpactHidden: boolean;
}

export interface InsightIconContainerProps {
  $criticality: number;
}
