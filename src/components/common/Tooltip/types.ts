import type { Placement } from "@floating-ui/react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

export interface TooltipThemeColors {
  background: string;
  text: string;
}

export interface TooltipProps {
  children: ReactElement;
  title: ReactNode;
  placement?: Placement;
  style?: CSSProperties;
  isOpen?: boolean;
}
