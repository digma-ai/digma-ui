import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import * as s from "./styles";
import type { IconButtonProps } from "./types";

export const IconButtonComponent = (
  { className, onClick, isDisabled, icon, isHighlighted }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button
    ref={ref}
    $isHighlighted={isHighlighted}
    className={className}
    onClick={onClick}
    disabled={isDisabled}
  >
    {icon}
  </s.Button>
);

export const IconButton = forwardRef(IconButtonComponent);
