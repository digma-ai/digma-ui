import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { isString } from "../../../typeGuards/isString";
import * as s from "./styles";
import type { ChipProps } from "./types";

export const ChipComponent = (
  { children, className, ...rest }: ChipProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Container {...rest} className={className} ref={ref}>
    {isString(children) ? <s.Label>{children}</s.Label> : children}
  </s.Container>
);

export const Chip = forwardRef(ChipComponent);
