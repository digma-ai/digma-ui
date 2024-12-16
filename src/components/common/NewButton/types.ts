import type { ButtonHTMLAttributes, ComponentType } from "react";
import type { IconProps } from "../../common/icons/types";

export interface ButtonThemeColors {
  background?: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  border?: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  icon: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
}

export type ButtonType = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "large";

export interface NewButtonProps {
  icon?: ComponentType<IconProps>;
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
