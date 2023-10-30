export interface AssetTypeListProps {
  data?: AssetCategoriesData;
  onAssetTypeSelect: (assetTypeId: string) => void;
}

export interface AssetCategoriesData {
  assetCategories: {
    name: string;
    count: number;
  }[];
}
