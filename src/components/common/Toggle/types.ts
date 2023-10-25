export type ToggleValue = number | string;

export interface ToggleProps {
  options: { value: ToggleValue; label: string }[];
  onValueChange: (value: ToggleValue) => void;
  value: ToggleValue;
}

export interface OptionButtonProps {
  $selected: boolean;
}
