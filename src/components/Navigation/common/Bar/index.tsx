import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { BarProps } from "./types";

export const BarComponent = (
  { children, className, ...rest }: BarProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container {...rest} className={className} ref={ref}>
    {children}
  </s.Container>
);

export const Bar = forwardRef(BarComponent);
