export interface AssetsViewConfigurationProps {
  assetsCount?: number;
}

export interface AssetScopeOption {
  scopedSpanCodeObjectId?: string;
  isDirect: boolean;
}

export type ViewMode = "descendants" | "children";
