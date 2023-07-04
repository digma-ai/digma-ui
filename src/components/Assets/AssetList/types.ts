import { ExtendedAssetEntry } from "../types";

export interface ExtendedAssetEntryWithServices extends ExtendedAssetEntry {
  relatedServices: string[];
}

export interface AssetListProps {
  onBackButtonClick: () => void;
  assetTypeId: string;
  entries: { [key: string]: ExtendedAssetEntry[] };
  onAssetLinkClick: (entry: ExtendedAssetEntryWithServices) => void;
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "Critical insights",
  PERFORMANCE = "Performance",
  SLOWEST_FIVE_PERCENT = "Slowest 5%",
  LATEST = "Latest",
  NAME = "Name"
}

export interface Sorting {
  criterion: SORTING_CRITERION;
  isDesc: boolean;
}
