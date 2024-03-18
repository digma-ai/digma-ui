import { Scope } from "../../common/App/types";

export interface AssetsViewConfigurationProps {
  onAssetViewChange: (assetViewScope: AssetScopeOption) => void;
  currentScope: Scope;
  assetsCount?: number;
}

export interface AssetScopeOption {
  scopedSpanCodeObjectId?: string;
  isDirect: boolean;
}
