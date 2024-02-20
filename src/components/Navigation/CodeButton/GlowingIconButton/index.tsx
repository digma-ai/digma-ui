import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { GlowingIconButtonProps } from "./types";

export const GlowingIconButtonComponent = (
  props: GlowingIconButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.BorderContainer $type={props.type} ref={ref}>
    <s.BorderlessIconButton icon={props.icon} onClick={props.onClick} />
  </s.BorderContainer>
);

export const GlowingIconButton = forwardRef(GlowingIconButtonComponent);
