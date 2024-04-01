import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButtonComponent = (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button
    ref={ref}
    disabled={props.isDisabled}
    onClick={props.onClick}
    className={props.className}
  >
    <props.icon.component
      size={props.icon.size || 16}
      color={props.icon.color || "currentColor"}
    />
  </s.Button>
);

export const IconButton = forwardRef(IconButtonComponent);
