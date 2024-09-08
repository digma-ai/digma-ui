import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";

export interface AssetTypeListProps {
  onAssetTypeSelect: (assetTypeId: string) => void;
  setRefresher: (refresher: () => void) => void;
  onAssetCountChange: (count: number) => void;
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
