import { ForwardedRef, forwardRef } from "react";
import { isString } from "../../../typeGuards/isString";
import * as s from "./styles";
import { NewButtonProps } from "./types";

export const NewButtonComponent = (
  {
    buttonType = "primary",
    size = "small",
    disabled,
    title,
    onClick,
    className,
    type,
    form,
    icon: Icon,
    label
  }: NewButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const iconSize = size === "large" ? 16 : 13;

  return (
    <s.Button
      ref={ref}
      disabled={disabled}
      title={title}
      onClick={onClick}
      $type={buttonType}
      className={className}
      $size={size}
      type={type}
      form={form}
    >
      {Icon && <Icon size={iconSize} color={"currentColor"} />}
      {isString(label) && (
        <s.Label $disabled={disabled} $size={size} $type={buttonType}>
          {label}
        </s.Label>
      )}
    </s.Button>
  );
};

export const NewButton = forwardRef(NewButtonComponent);
