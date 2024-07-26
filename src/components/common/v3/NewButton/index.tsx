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
    label,
    iconPosition
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const location = iconPosition ?? "left";

  return (
    <s.Button
      ref={ref}
      disabled={isDisabled}
      onClick={onClick}
      $type={buttonType}
      className={className}
      type={type}
      form={form}
    >
      {Icon && location === "left" && <Icon size={16} color={"currentColor"} />}
      {isString(label) && <span>{label}</span>}
      {Icon && location === "right" && (
        <Icon size={16} color={"currentColor"} />
      )}
    </s.Button>
  );
};
export const NewButton = forwardRef(NewButtonComponent);
