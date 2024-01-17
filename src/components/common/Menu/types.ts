import { ComponentType } from "react";
import { IconProps } from "../icons/types";

export interface MenuProps {
  title?: string;
  width?: string;
  items: {
    label: string;
    value: string;
    icon?: {
      component: ComponentType<IconProps>;
      color?: string;
      size?: number;
    };
    onClick?: (value: string) => void;
  }[];
  onSelect: (value: string) => void;
}
