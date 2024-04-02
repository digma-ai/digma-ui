import { ChangeEventHandler, ReactNode } from "react";
import { IconProps } from "../../icons/types";

export interface TextFieldProps {
  placeholder?: string;
  inputEndContent?: ReactNode;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  error?: string;
  icon?: React.ComponentType<IconProps>;
}

export interface ContainerProps {
  $focused: boolean;
  $isInvalid?: boolean;
}

export interface IconContainerProps {
  $isInvalid?: boolean;
}

export interface InputProps {
  $isInvalid?: boolean;
}
