import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButtonComponent = (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button
    ref={ref}
    className={props.className}
    onClick={props.onClick}
    disabled={props.isDisabled}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    {props.icon}
  </s.Button>
);

export const IconButton = forwardRef(IconButtonComponent);
