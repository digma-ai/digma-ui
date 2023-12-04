import { ButtonHTMLAttributes } from "react";
import { IconProps } from "../../common/icons/types";

export type ButtonType = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "large";

export interface NewButtonProps {
  icon?: React.ComponentType<IconProps>;
  label?: string;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  buttonType?: ButtonType;
  className?: string;
  size?: ButtonSize;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  form?: ButtonHTMLAttributes<HTMLButtonElement>["form"];
}

export interface ButtonElementProps {
  $type: ButtonType;
  $size: ButtonSize;
}

export interface LabelProps {
  $type: ButtonType;
  $size: ButtonSize;
  $disabled?: boolean;
}
