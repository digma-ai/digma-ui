import React, { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

const IconButtonComponent = (
  { onClick, className, isDisabled, icon, buttonType }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <s.Button
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      ref={ref}
      $type={buttonType}
    >
      <icon.component size={icon.size} color={"currentColor"} />
    </s.Button>
  );
};

export const IconButton = forwardRef(IconButtonComponent);
