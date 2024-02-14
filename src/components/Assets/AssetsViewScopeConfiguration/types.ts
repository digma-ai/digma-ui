export interface AssetsViewConfigurationProps {
  onAssetViewChanged: (isDirect: AssetScopeOption) => void;
}

export interface AssetScopeOption {
  scopedSpanCodeObjectId?: string;
  isDirect: boolean;
}
