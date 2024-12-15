import type { ReactNode } from "react";

export interface CheckboxProps {
  value: boolean;
  label: ReactNode;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

export interface LabelProps {
  $disabled?: boolean;
}
