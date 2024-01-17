import React, { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const ButtonComponent = (
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const buttonType = props.buttonType || "primary";

  return (
    <s.Button
      ref={ref}
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      $buttonType={buttonType}
    >
      <s.ContentContainer>
        {props.icon && (
          <props.icon.component
            size={props.icon.size || 14}
            color={props.icon.color || "currentColor"}
          />
        )}
        {props.children && <span>{props.children}</span>}
        {props.afterTextIcon && props.afterTextIcon}
      </s.ContentContainer>
    </s.Button>
  );
};

export const Button = forwardRef(ButtonComponent);
