import { AssetFilterQuery } from "../AssetsFilter/types";

export interface AssetTypeListProps {
  data?: AssetCategoriesData;
  onAssetTypeSelect: (assetTypeId: string) => void;
  services: string[];
  filters?: AssetFilterQuery;
}

export interface AssetCategoriesData {
  assetCategories: {
    name: string;
    count: number;
  }[];
}
