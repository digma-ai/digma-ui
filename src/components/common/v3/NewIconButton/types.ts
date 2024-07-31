import { ComponentType, MouseEventHandler } from "react";
import { IconProps } from "../../icons/types";

export type ButtonType = "primary" | "secondary" | "tertiary";

export interface NewIconButtonProps {
  icon: ComponentType<IconProps>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
  buttonType?: ButtonType;
  isHighlighted?: boolean;
}

export interface ButtonElementProps {
  $type?: ButtonType;
  $isHighlighted?: boolean;
}
