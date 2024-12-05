import { ForwardedRef, forwardRef, MouseEvent } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

/** @deprecated */
const IconButtonComponent = (
  { onClick, className, disabled, icon }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <s.Button
      className={className}
      onClick={handleClick}
      disabled={disabled}
      ref={ref}
    >
      <icon.component size={icon.size} color={"currentColor"} />
    </s.Button>
  );
};

/** @deprecated */
export const IconButton = forwardRef(IconButtonComponent);
