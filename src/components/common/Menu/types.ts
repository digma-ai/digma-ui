import type { ComponentType } from "react";
import type { IconProps } from "../icons/types";

export interface MenuItem {
  label: string;
  value: string;
  icon?: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  onClick?: (value: string) => void;
}

export interface MenuProps {
  title?: string;
  width?: string;
  items: MenuItem[];
  onSelect: (value: string) => void;
}

export interface ListProps {
  width?: string;
}
