import { AssetEntryWithServices, SORTING_CRITERION } from "../types";

export interface AssetEntryProps {
  entry: AssetEntryWithServices;
  onAssetLinkClick: (entry: AssetEntryWithServices) => void;
  sortingCriterion: SORTING_CRITERION;
}
