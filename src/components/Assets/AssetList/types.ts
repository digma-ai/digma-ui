import type {
  AssetsSortingCriterion,
  AssetType,
  SortingOrder
} from "../../../redux/services/types";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { Sorting } from "../../common/SortingSelector/types";

export interface AssetListProps {
  onGoToAllAssets: () => void;
  assetTypeId: AssetType;
  isImpactHidden: boolean;
  sorting: Sorting<AssetsSortingCriterion>;
  environmentId?: string;
  spanCodeObjectId?: string;
  setSorting: (sorting: Sorting<AssetsSortingCriterion>) => void;
  services?: string[];
  onScopeChange: (payload: ChangeScopePayload) => void;
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
