import type {
  ChangeEventHandler,
  ComponentType,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactNode
} from "react";
import type { IconProps } from "../../icons/types";

export interface TextFieldProps {
  placeholder?: string;
  inputEndContent?: ReactNode;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  error?: string;
  type?: HTMLInputTypeAttribute;
  icon?: ComponentType<IconProps>;
  alwaysRenderError?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

export interface ContainerProps {
  $focused: boolean;
  $isInvalid?: boolean;
  $alwaysRenderError?: boolean;
}

export interface IconContainerProps {
  $isInvalid?: boolean;
}

export interface InputProps {
  $isInvalid?: boolean;
}

export interface TextInputControlProps {
  $alwaysRenderError?: boolean;
}
