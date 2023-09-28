import { ExtendedAssetEntryWithServices } from "../types";

export interface AssetListProps {
  onBackButtonClick: () => void;
  assetTypeId: string;
  entries: ExtendedAssetEntryWithServices[];
  onAssetLinkClick: (entry: ExtendedAssetEntryWithServices) => void;
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "Critical insights",
  PERFORMANCE = "Performance",
  SLOWEST_FIVE_PERCENT = "Slowest 5%",
  LATEST = "Latest",
  NAME = "Name",
  PERFORMANCE_IMPACT = "Performance impact",
  OVERALL_IMPACT = "Overall impact"
}

export enum SORTING_ORDER {
  ASC = "asc",
  DESC = "desc"
}

export interface Sorting {
  criterion: SORTING_CRITERION;
  order: SORTING_ORDER;
}

export interface SortingMenuButtonProps {
  isOpen: boolean;
}

export interface SortingOrderOptionProps {
  selected: boolean;
}
