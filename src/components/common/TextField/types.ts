import type { ChangeEventHandler, ReactNode } from "react";

export interface TextFieldProps {
  placeholder?: string;
  inputEndContent?: ReactNode;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
}

export interface ContainerProps {
  $focused: boolean;
}
