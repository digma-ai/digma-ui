import { ReactNode } from "react";

export interface SelectOption {
  label: ReactNode;
  value: string;
}

export interface SelectProps {
  value?: string;
  options: SelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
  onChange: (value: string) => void;
}

export interface SelectBarProps {
  $isOpen: boolean;
  $isDisabled?: boolean;
}
