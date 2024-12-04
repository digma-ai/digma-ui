import { ForwardedRef, forwardRef, MouseEvent } from "react";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const ButtonComponent = (
  {
    onClick,
    buttonType = "primary",
    className,
    disabled,
    icon: Icon,
    children,
    afterTextIcon
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <s.Button
      ref={ref}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      $buttonType={buttonType}
    >
      <s.ContentContainer>
        {Icon && (
          <Icon.component
            size={Icon.size ?? 14}
            color={Icon.color ?? "currentColor"}
          />
        )}
        {children && <span>{children}</span>}
        {afterTextIcon}
      </s.ContentContainer>
    </s.Button>
  );
};

/** @deprecated */
export const Button = forwardRef(ButtonComponent);
