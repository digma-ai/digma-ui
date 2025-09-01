import type { MouseEvent, ReactNode } from "react";

export interface NavigationItem {
  id: string;
  name: string;
  route: string;
  icon?: ReactNode;
  items?: NavigationItem[];
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export interface ContainerProps {
  $isActive?: boolean;
}

export interface NavMenuItemProps {
  item: NavigationItem;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}
