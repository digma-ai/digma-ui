import { Placement } from "@floating-ui/react";
import { ReactElement, ReactNode } from "react";

export interface TooltipThemeColors {
  background: string;
  text: string;
}

export interface TooltipProps {
  children: ReactElement;
  title: ReactNode;
  placement?: Placement;
  style?: React.CSSProperties;
  isOpen?: boolean;
}
