import type { ReactNode } from "react";

export interface NavigationItem {
  id: string;
  name: string;
  route: string;
  icon?: ReactNode;
  items?: NavigationItem[];
}

export interface ContainerProps {
  $isActive?: boolean;
}

export interface NavMenuItemProps {
  item: NavigationItem;
  onClick?: () => void;
}
