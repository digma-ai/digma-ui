import { IconProps } from "../../../common/icons/types";
import { INSIGHT_TYPES } from "../../types";

export interface CategoryItem {
  id: string;
  label: string;
  insights: INSIGHT_TYPES[];
}

export interface AssetsListCategoryProps {
  id: string;
  label: string;
  icon: React.ComponentType<IconProps>;
  items: CategoryItem[];
  onSelect: (categoryId: string) => void;
}

export interface CategoryProps {
  isExpanded: boolean;
}

export interface InsightCountProps {
  isExpanded?: boolean;
}
