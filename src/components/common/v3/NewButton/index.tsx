import { ForwardedRef, forwardRef } from "react";
import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import { ButtonProps, ButtonType } from "./types";

const getButtonComponent = (buttonType: ButtonType) => {
  switch (buttonType) {
    case "primary":
      return s.PrimaryButton;
    case "secondary":
      return s.SecondaryButton;
    case "primaryBorderless":
      return s.PrimaryBorderlessButton;
    case "secondaryBorderless":
      return s.SecondaryBorderlessButton;
  }
};

export const NewButtonComponent = (
  {
    isDisabled,
    onClick,
    buttonType = "primary",
    className,
    type,
    form,
    icon: Icon,
    label,
    iconPosition = "left"
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const ButtonComponent = getButtonComponent(buttonType);

  return (
    <ButtonComponent
      ref={ref}
      disabled={isDisabled}
      onClick={onClick}
      $type={buttonType}
      className={className}
      type={type}
      form={form}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={16} color={"currentColor"} />
      )}
      {isString(label) && <span>{label}</span>}
      {Icon && iconPosition === "right" && (
        <Icon size={16} color={"currentColor"} />
      )}
    </ButtonComponent>
  );
};

export const NewButton = forwardRef(NewButtonComponent);
