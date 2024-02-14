import React from "react";
import { IconProps } from "../../common/icons/types";

export interface IconButtonProps {
  icon: React.ComponentType<IconProps>;
  isDisabled?: boolean;
  className?: string;
}
