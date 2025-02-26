import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import * as s from "./styles";
import type { ButtonType, NewIconButtonProps } from "./types";

const getButtonComponent = (buttonType: ButtonType) => {
  switch (buttonType) {
    case "primary":
      return s.PrimaryIconButton;
    case "secondary":
      return s.SecondaryIconButton;
    case "secondaryBorderless":
      return s.SecondaryBorderlessIconButton;
  }
};

const NewIconButtonComponent = (
  {
    onClick,
    className,
    isDisabled,
    icon: Icon,
    buttonType = "primary",
    size = "medium",
    isHighlighted
  }: NewIconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const ButtonComponent = getButtonComponent(buttonType);

  return (
    <ButtonComponent
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      ref={ref}
      $type={buttonType}
      $size={size}
      $isHighlighted={isHighlighted}
    >
      <Icon size={size === "large" ? 20 : 16} color={"currentColor"} />
    </ButtonComponent>
  );
};

export const NewIconButton = forwardRef(NewIconButtonComponent);
