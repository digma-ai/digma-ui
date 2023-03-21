import React from "react";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const disabled =
    ["success", "failure"].includes(props.buttonType) || props.disabled;
  return (
    <s.Button
      onClick={handleClick}
      disabled={disabled}
      buttonType={props.buttonType}
    >
      <s.ContentContainer>
        {props.icon}
        <span>{props.children}</span>
      </s.ContentContainer>
    </s.Button>
  );
};
