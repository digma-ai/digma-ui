import { MemoExoticComponent } from "react";
import { SpanInfo } from "../../../types";
import { IconProps } from "../../common/icons/types";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { AssetScopeOption } from "../AssetsViewScopeConfiguration/types";

export interface AssetTypeListProps {
  onAssetTypeSelect: (assetTypeId: string) => void;
  filters?: AssetFilterQuery;
  searchQuery: string;
  scopeViewOptions: AssetScopeOption | null;
  setRefresher: (refresher: () => void) => void;
  onAssetCountChange: (count: number) => void;
}

export interface AssetCategoriesData {
  assetCategories: {
    name: string;
    count: number;
  }[];
  parents?: SpanInfo[];
}

export interface AssetCategoryData {
  name: string;
  count: number;
  label?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}
