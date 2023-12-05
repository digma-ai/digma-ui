import { ChangeEventHandler, FocusEventHandler } from "react";
import { IconProps } from "../../../common/icons/types";

export interface TextFieldProps {
  placeholder?: string;
  icon?: React.ComponentType<IconProps>;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  isValid?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
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
