import type { ComponentType } from "react";
import type { IconProps } from "../icons/types";

export interface MenuItem<T> {
  label: string;
  value: T;
  icon?: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  onClick?: (value: T) => void;
}

export interface MenuProps<T> {
  title?: string;
  width?: string;
  items: MenuItem<T>[];
  onSelect: (value: T) => void;
}

export interface ListProps {
  width?: string;
}
