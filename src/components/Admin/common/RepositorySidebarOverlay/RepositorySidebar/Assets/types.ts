import type { AssetType } from "../../../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";

export interface AssetsProps {
  onScopeChange: (payload: ChangeScopePayload) => void;
  selectedAssetTypeId?: AssetType;
  onSelectedAssetTypeIdChange: (assetTypeId?: AssetType) => void;
}
