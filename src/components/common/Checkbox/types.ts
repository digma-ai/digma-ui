import { ReactNode } from "react";

export interface CheckboxProps {
  id: string;
  value: boolean;
  label: ReactNode;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}
