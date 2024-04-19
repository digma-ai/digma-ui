import { ComponentType, ReactNode } from "react";
import { IconProps } from "../../icons/types";

export type ToggleValue = string | number;
export type ToggleSize = "small" | "large";

export interface ToggleOption<T> {
  value: T;
  label?: string | ReactNode;
  icon?: ComponentType<IconProps>;
}

export interface ToggleProps<T> {
  options: ToggleOption<T>[];
  onValueChange: (value: T) => void;
  value: T;
  size?: ToggleSize;
}

export interface OptionButtonProps {
  $selected: boolean;
  $size: ToggleSize;
}
