import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import * as s from "./styles";
import type { BarProps } from "./types";

export const BarComponent = (
  { children, className, ...rest }: BarProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container {...rest} className={className} ref={ref}>
    {children}
  </s.Container>
);

export const Bar = forwardRef(BarComponent);
