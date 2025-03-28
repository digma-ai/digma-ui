import type { Placement } from "@floating-ui/react";
import type { ReactElement } from "react";

export interface PopoverProps {
  children: ReactElement;
  content: ReactElement;
  placement?: Placement;
  arrow?: boolean;
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  boundary?: HTMLElement;
  width?: number | string;
  sameWidth?: boolean;
  useClickInteraction?: boolean;
  closeOnOutsidePress?: boolean;
  useShift?: boolean;
}
