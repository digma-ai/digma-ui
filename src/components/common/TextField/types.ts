import { ChangeEventHandler, ReactNode } from "react";

export interface TextFieldProps {
  placeholder?: string;
  inputEndContent?: ReactNode;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface ContainerProps {
  focused: boolean;
}
