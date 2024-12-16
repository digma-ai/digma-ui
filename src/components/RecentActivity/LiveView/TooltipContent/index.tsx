import * as s from "./styles";
import type { TooltipContentProps } from "./types";

export const TooltipContent = ({ children }: TooltipContentProps) => (
  <s.Container>{children}</s.Container>
);
