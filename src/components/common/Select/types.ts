import { ComponentType } from "react";
import { IconProps } from "../icons/types";

export interface SelectThemeColors {
  menu: {
    text: {
      primary: string;
    };
    background: string;
  };
}

export interface SelectItem {
  value: string;
  label: string;
  enabled?: boolean;
  selected?: boolean;
}

export interface SelectProps {
  items: SelectItem[];
  multiselect?: boolean;
  searchable?: boolean;
  onChange: (value: string | string[]) => void;
  counts?: {
    total: number;
    filtered: number;
  };
  placeholder?: string;
  disabled?: boolean;
  icon?: ComponentType<IconProps>;
}

export interface ButtonProps {
  $isActive: boolean;
}

export interface OptionListItemProps {
  $selected?: boolean;
  $enabled?: boolean;
}

export interface ChevronIconContainerProps {
  $disabled?: boolean;
}
