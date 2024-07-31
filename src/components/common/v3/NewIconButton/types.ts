import { ComponentType, MouseEventHandler } from "react";
import { IconProps } from "../../icons/types";

export type ButtonType = "primary" | "secondary" | "tertiary";
export type ButtonSize = "medium" | "small";

export interface NewIconButtonProps {
  icon: ComponentType<IconProps>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
  buttonType?: ButtonType;
  isHighlighted?: boolean;
  size?: ButtonSize;
}

export interface ButtonElementProps {
  $type?: ButtonType;
  $size?: ButtonSize;
  $isHighlighted?: boolean;
}
