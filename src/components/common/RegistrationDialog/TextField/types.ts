import type {
  ChangeEventHandler,
  ComponentType,
  FocusEventHandler
} from "react";
import type { IconProps } from "../../icons/types";

export interface TextFieldProps {
  placeholder?: string;
  icon?: ComponentType<IconProps>;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  isValid?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  type?: "text" | "password";
}

export interface ContainerProps {
  $focused: boolean;
  $isValid?: boolean;
}

export interface IconContainerProps {
  $isValid?: boolean;
}

export interface InputProps {
  $isValid?: boolean;
}
