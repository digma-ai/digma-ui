import type { SORTING_ORDER } from "../../../redux/services/types";

export interface AssetListProps {
  onGoToAllAssets: () => void;
  assetTypeId: string;
  setRefresher: (refresher: () => void) => void;
}

export interface SortingMenuButtonProps {
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export interface SortingOrderIconContainerProps {
  $sortingOrder: SORTING_ORDER;
}
