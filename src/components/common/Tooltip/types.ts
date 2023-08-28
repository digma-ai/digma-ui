import { Placement } from "@floating-ui/react";
import { ReactElement, ReactNode } from "react";

export interface TooltipProps {
  children: ReactElement;
  title: ReactNode;
  placement?: Placement;
}
