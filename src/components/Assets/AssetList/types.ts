import type { AssetType, SortingOrder } from "../../../redux/services/types";

export interface AssetListProps {
  onGoToAllAssets: () => void;
  assetTypeId: AssetType;
}

export interface SortingMenuButtonProps {
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export interface SortingOrderIconContainerProps {
  $sortingOrder: SortingOrder;
}
