import type { MemoExoticComponent } from "react";
import type { AssetCategory, AssetType } from "../../../redux/services/types";
import type { IconProps } from "../../common/icons/types";

export interface AssetTypeListProps {
  onAssetTypeSelect: (assetTypeId: AssetType) => void;
  services?: string[];
  spanCodeObjectId?: string;
  environmentId?: string;
}

export interface AssetCategoryData extends AssetCategory {
  label?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}
