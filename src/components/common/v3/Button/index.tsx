import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const ButtonComponent = (
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <s.Button
    ref={ref}
    disabled={props.isDisabled}
    onClick={props.onClick}
    $type={props.buttonType}
    className={props.className}
    type={props.type}
    form={props.form}
  >
    {props.icon && <props.icon size={16} color={"currentColor"} />}
    {typeof props.label === "string" && <span>{props.label}</span>}
  </s.Button>
);
export const Button = forwardRef(ButtonComponent);
