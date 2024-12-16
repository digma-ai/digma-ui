import type { MenuItem } from "../../common/FilterMenu/types";

export interface EnvironmentFilterProps {
  items: MenuItem[];
  onMenuItemClick: (value: string) => void;
  isLoading: boolean;
}

export interface MenuButtonProps {
  $isOpen: boolean;
}
