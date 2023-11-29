export interface AssetTypeListProps {
  data?: AssetCategoriesData;
  onAssetTypeSelect: (assetTypeId: string) => void;
  services: string[];
}

export interface AssetCategoriesData {
  assetCategories: {
    name: string;
    count: number;
  }[];
}
