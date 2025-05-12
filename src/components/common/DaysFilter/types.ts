import type { ButtonProps } from "../v3/NewButton/types";

export interface DaysButtonProps extends ButtonProps {
  $isActive: boolean;
}

export interface DaysFilterProps {
  onChange: (days: number) => void;
  value: number | null;
  trackingPrefix?: string;
}

export interface CounterInputProps {
  $isActive: boolean;
}
