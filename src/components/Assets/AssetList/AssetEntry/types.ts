import { ExtendedAssetEntryWithServices } from "../../types";
import { SORTING_CRITERION } from "../types";

export interface AssetEntryProps {
  entry: ExtendedAssetEntryWithServices;
  onAssetLinkClick: (entry: ExtendedAssetEntryWithServices) => void;
  sortingCriterion: SORTING_CRITERION;
}
