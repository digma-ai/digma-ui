import { Scope } from "../../common/App/types";

export interface AssetsViewConfigurationProps {
  onAssetViewChanged: (assetViewScope: AssetScopeOption) => void;
  currentScope: Scope;
}

export interface AssetScopeOption {
  scopedSpanCodeObjectId?: string;
  isDirect: boolean;
}
