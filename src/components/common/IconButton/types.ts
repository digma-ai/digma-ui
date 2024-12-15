import type { ComponentType, MouseEventHandler } from "react";
import type { IconProps } from "../icons/types";

export interface IconButtonProps {
  icon: ComponentType<IconProps>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
