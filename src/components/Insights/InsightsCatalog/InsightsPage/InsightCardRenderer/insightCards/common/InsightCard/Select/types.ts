import type { ReactNode } from "react";

export interface SelectOption {
  label: string;
  customContent?: (props: CustomContentProps) => ReactNode;
  value: string;
}

export interface SelectProps {
  value?: string;
  options: SelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
  onChange: (value: string) => void;
  listHeader?: ReactNode;
}

export interface SelectBarProps {
  $isOpen: boolean;
  $isDisabled?: boolean;
}

export interface CustomContentProps {
  isSelected: boolean;
  onClick: (() => void) | null;
}
