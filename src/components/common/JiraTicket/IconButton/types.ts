import type { ComponentType } from "react";
import type { IconProps } from "../../../common/icons/types";

export interface IconButtonProps {
  icon: ComponentType<IconProps>;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  size?: number;
}
