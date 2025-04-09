import type {
  AssetType,
  GetIssuesPayload
} from "../../../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";

export interface AssetsProps {
  query?: GetIssuesPayload;
  onScopeChange: (payload: ChangeScopePayload) => void;
  selectedAssetTypeId?: AssetType;
  onSelectedAssetTypeIdChange: (assetTypeId?: AssetType) => void;
}
