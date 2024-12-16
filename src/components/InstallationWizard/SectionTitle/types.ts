import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "../../common/icons/types";

export interface SectionTitleProps {
  icon?: ComponentType<IconProps>;
  children: ReactNode;
  className?: string;
}
