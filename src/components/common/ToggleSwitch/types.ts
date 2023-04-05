export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
}

export interface SwitchContainerProps {
  isChecked: boolean;
}

export type CircleProps = SwitchContainerProps;
