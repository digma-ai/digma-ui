import React from "react";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <s.Button
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      buttonType={props.buttonType || "primary"}
    >
      <s.ContentContainer>
        {props.icon}
        <span>{props.children}</span>
      </s.ContentContainer>
    </s.Button>
  );
};
