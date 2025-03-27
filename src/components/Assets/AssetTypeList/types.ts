import type { MemoExoticComponent } from "react";
import type { AssetCategory } from "../../../redux/services/types";
import type { IconProps } from "../../common/icons/types";

export interface AssetTypeListProps {
  onAssetTypeSelect: (assetTypeId: string) => void;
}

export interface AssetCategoryData extends AssetCategory {
  label?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}
