import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { AssetScopeOption } from "../AssetsViewScopeConfiguration/types";

export interface AssetTypeListProps {
  data?: AssetCategoriesData;
  onAssetTypeSelect: (assetTypeId: string) => void;
  services?: string[];
  filters?: AssetFilterQuery;
  searchQuery: string;
  scopeViewOptions: AssetScopeOption | null;
}

export interface AssetCategoriesData {
  assetCategories: {
    name: string;
    count: number;
  }[];
}

export interface AssetCategoryData {
  name: string;
  count: number;
  label?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}
