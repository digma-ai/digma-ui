import { ForwardedRef, forwardRef } from "react";
import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const NewButtonComponent = (
  {
    isDisabled,
    onClick,
    buttonType,
    className,
    type,
    form,
    icon: Icon,
    label
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button
    ref={ref}
    disabled={isDisabled}
    onClick={onClick}
    $type={buttonType}
    className={className}
    type={type}
    form={form}
  >
    {Icon && <Icon size={16} color={"currentColor"} />}
    {isString(label) && <span>{label}</span>}
  </s.Button>
);
export const NewButton = forwardRef(NewButtonComponent);
