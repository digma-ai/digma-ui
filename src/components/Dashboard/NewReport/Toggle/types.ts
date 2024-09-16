import { ReactNode } from "react";

export type ToggleValue = string | number;
export type ToggleSize = "small" | "large";

export interface ToggleOption<T> {
  value: T;
  label?: string | ReactNode;
}

export interface ToggleProps<T> {
  options: ToggleOption<T>[];
  onValueChange: (value: T) => void;
  value: T;
}

export interface OptionButtonProps {
  $selected: boolean;
}
