import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButtonComponent = (
  { isDisabled, onClick, className, icon }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button
    ref={ref}
    disabled={isDisabled}
    onClick={onClick}
    className={className}
  >
    <icon.component
      size={icon.size ?? 16}
      color={icon.color ?? "currentColor"}
    />
  </s.Button>
);

export const IconButton = forwardRef(IconButtonComponent);
