import type {
  AssetsSortingCriterion,
  AssetType,
  GetEnvironmentsResponse
} from "../../../redux/services/types";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { Sorting } from "../../common/SortingSelector/types";

export interface AssetsContentProps {
  spanCodeObjectId?: string;
  environments?: GetEnvironmentsResponse;
  environmentId?: string;
  services?: string[];
  sorting: Sorting<AssetsSortingCriterion>;
  setSorting: (sorting: Sorting<AssetsSortingCriterion>) => void;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToAllAssets: () => void;
  onAssetTypeSelect: (assetTypeId: AssetType) => void;
  isImpactHidden: boolean;
  onRefresh: () => void;
  selectedAssetTypeId?: string;
  areFiltersEnabled: boolean;
  className?: string;
}
