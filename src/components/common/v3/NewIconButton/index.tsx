import React, { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { NewIconButtonProps } from "./types";

const NewIconButtonComponent = (
  {
    onClick,
    className,
    isDisabled,
    icon: Icon,
    buttonType,
    isHighlighted
  }: NewIconButtonProps,
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
      $isHighlighted={isHighlighted}
    >
      <Icon size={16} color={"currentColor"} />
    </s.Button>
  );
};

export const NewIconButton = forwardRef(NewIconButtonComponent);
