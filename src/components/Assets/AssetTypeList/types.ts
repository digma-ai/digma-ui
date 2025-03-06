import type { MemoExoticComponent } from "react";
import type { SpanInfo } from "../../../redux/services/types";
import type { IconProps } from "../../common/icons/types";

export interface AssetTypeListProps {
  onAssetTypeSelect: (assetTypeId: string) => void;
  setRefresher: (refresher: () => void) => void;
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

export interface GetAssetCategoriesDataPayload {
  query: {
    directOnly: boolean;
    scopedSpanCodeObjectId?: string;
    services: string[];
    operations: string[];
    insights: string[];
    displayName?: string;
  };
}
