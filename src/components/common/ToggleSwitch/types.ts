export type ToggleSwitchSize = "large" | "small";

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  size?: ToggleSwitchSize;
  onChange?: (value: boolean) => void;
  className?: string;
  labelPosition?: "start" | "end";
  disabled?: boolean;
}

export interface ContainerProps {
  $size: ToggleSwitchSize;
  $disabled?: boolean;
}

export interface SwitchContainerProps {
  $isChecked: boolean;
  $size: ToggleSwitchSize;
  $disabled?: boolean;
}

export interface CircleProps {
  $isChecked: boolean;
  $size: ToggleSwitchSize;
  $disabled?: boolean;
}
