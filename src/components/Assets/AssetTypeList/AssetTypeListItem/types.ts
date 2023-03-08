import { MemoExoticComponent } from "react";
import { IconProps } from "../../../common/icons/types";

export interface AssetTypeListItemProps {
  id: string;
  label?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  entryCount: number;
  onSelect: (assetTypeId: string) => void;
}
