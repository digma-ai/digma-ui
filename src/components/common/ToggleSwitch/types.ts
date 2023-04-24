export type ToggleSwitchSize = "large" | "small";

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  size?: ToggleSwitchSize;
  onChange?: (value: boolean) => void;
  className?: string;
}

export interface ContainerProps {
  size: ToggleSwitchSize;
}

export interface SwitchContainerProps {
  isChecked: boolean;
  size: ToggleSwitchSize;
}

export interface CircleProps {
  isChecked: boolean;
  size: ToggleSwitchSize;
}
