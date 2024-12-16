import type { ComponentType } from "react";
import type { IconProps } from "../../icons/types";

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
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  icon?: ComponentType<IconProps>;
  className?: string;
  showSelectedState?: boolean;
  useShift?: boolean;
  sameWidth?: boolean;
}

export interface ButtonProps {
  $isActive: boolean;
}

export interface ButtonLabelProps {
  $isActive: boolean;
}

export interface OptionListItemProps {
  $selected?: boolean;
  $enabled?: boolean;
}

export interface ChevronIconContainerProps {
  $disabled?: boolean;
}
