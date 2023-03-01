import { IconProps } from "../../common/icons/types";
import { CategoryItem } from "./AssetsListItem/types";

export type AssetsListProps = {
  groups: {
    id: string;
    icon: React.ComponentType<IconProps>;
    label: string;
    items: CategoryItem[];
  }[];
  onSelect: (categoryId: string) => void;
};
