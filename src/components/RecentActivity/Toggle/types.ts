import type { ComponentType } from "react";
import type { IconProps } from "../../common/icons/types";

export interface ToggleThemeColors {
  background: string;
  border: string;
  option: {
    default: {
      background: string;
      text: string;
      icon: string;
    };
    selected: {
      background: string;
      text: string;
      icon: string;
    };
  };
}

export interface ToggleProps<T> {
  options: { value: T; icon: ComponentType<IconProps> }[];
  value: T;
  onChange: (value: T) => void;
}

export interface ToggleOptionButtonProps {
  $selected: boolean;
}
