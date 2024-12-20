import type { ReactNode } from "react";

export interface NavigationItem {
  id: string;
  name: string;
  route: string;
  icon: ReactNode;
  isActive: boolean;
}

export interface NavigationListItemProps {
  $isActive?: boolean;
}
