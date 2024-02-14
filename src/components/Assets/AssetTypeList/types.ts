import { AssetFilterQuery } from "../AssetsFilter/types";
import { AssetScopeOption } from "../AssetsViewScopeConfiguration/types";

export interface AssetTypeListProps {
  data?: AssetCategoriesData;
  onAssetTypeSelect: (assetTypeId: string) => void;
  services?: string[];
  filters?: AssetFilterQuery;
  searchQuery: string;
  scopeViewOptions?: AssetScopeOption;
}

export interface AssetCategoriesData {
  assetCategories: {
    name: string;
    count: number;
  }[];
}
