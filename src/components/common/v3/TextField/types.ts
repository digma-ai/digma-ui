import { ChangeEventHandler, ReactNode } from "react";
import { IconProps } from "../../icons/types";

export interface TextFieldProps {
  placeholder?: string;
  inputEndContent?: ReactNode;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  isInValid?: boolean;
  error?: string;
  icon?: React.ComponentType<IconProps>;
}

export interface ContainerProps {
  $focused: boolean;
  $isInValid?: boolean;
}

export interface IconContainerProps {
  $isInValid?: boolean;
}

export interface InputProps {
  $isInValid?: boolean;
}
