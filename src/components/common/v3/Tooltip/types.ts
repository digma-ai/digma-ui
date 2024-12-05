import { Placement } from "@floating-ui/react";
import { CSSProperties, ReactElement, ReactNode } from "react";

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
  fullWidth?: boolean;
  isDisabled?: boolean;
  boundary?: HTMLElement;
  followCursor?: boolean;
  hideArrow?: boolean;
  className?: string;
  onDismiss?: () => void;
}

export interface TooltipComponentProps {
  $fullWidth?: boolean;
}
