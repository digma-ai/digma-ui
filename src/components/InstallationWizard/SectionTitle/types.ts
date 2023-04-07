import { ComponentType, ReactNode } from "react";
import { IconProps } from "../../common/icons/types";

export interface SectionTitleProps {
  icon?: ComponentType<IconProps>;
  children: ReactNode;
  className?: string;
}
