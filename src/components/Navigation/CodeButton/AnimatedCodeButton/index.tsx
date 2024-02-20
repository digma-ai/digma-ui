import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { AnimatedCodeButtonProps } from "./types";

export const AnimatedCodeButtonComponent = (
  props: AnimatedCodeButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button onClick={props.onClick} ref={ref}>
    <s.BorderContainer />
    <s.Background>
      <s.InitialMask />
      <s.EndMask />
    </s.Background>
  </s.Button>
);

export const AnimatedCodeButton = forwardRef(AnimatedCodeButtonComponent);
