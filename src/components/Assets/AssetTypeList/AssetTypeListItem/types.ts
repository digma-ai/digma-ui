import type { MemoExoticComponent } from "react";
import type { AssetType } from "../../../../redux/services/types";
import type { IconProps } from "../../../common/icons/types";

export interface AssetTypeListItemProps {
  id: AssetType;
  label?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  entryCount: number;
  onAssetTypeClick: (assetTypeId: AssetType) => void;
}
