import type {
  AssetsSortingCriterion,
  AssetType,
  GetAboutResponse,
  GetEnvironmentsResponse
} from "../../../redux/services/types";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { BackendInfo, ScopeSpanRole } from "../../common/App/types";
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
  className?: string;
  backendInfo?: BackendInfo | GetAboutResponse | null;
  spanRole?: ScopeSpanRole;
}
