export type ToggleValue = string | number;

export interface ToggleOption<T> {
  value: T;
  label: string;
}

export interface ToggleProps<T> {
  options: ToggleOption<T>[];
  onValueChange: (value: T) => void;
  value: T;
}

export interface OptionButtonProps {
  $selected: boolean;
}
