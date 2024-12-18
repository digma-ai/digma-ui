import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import type { ButtonProps } from "./types";

/** @deprecated */
export const ButtonComponent = (
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

/** @deprecated */
export const Button = forwardRef(ButtonComponent);
