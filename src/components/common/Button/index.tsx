import React from "react";
import * as s from "./styles";
import { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const buttonType = props.buttonType || "primary";

  return (
    <s.Button
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      buttonType={buttonType}
    >
      <s.ContentContainer>
        {props.icon && (
          <props.icon.component
            size={props.icon.size || 14}
            color={"currentColor"}
          />
        )}
        <span>{props.children}</span>
      </s.ContentContainer>
    </s.Button>
  );
};
