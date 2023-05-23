import * as s from "./styles";
import { TooltipContentProps } from "./types";

export const TooltipContent = (props: TooltipContentProps) => (
  <s.Container>{props.children}</s.Container>
);
