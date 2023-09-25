import React from "react";
import * as s from "./styles";
import { FloatingIconButtonProps } from "./types";

export const FloatingIconButton = (props: FloatingIconButtonProps) => {
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
    >
      <props.icon.component
        size={props.icon.size || 14}
        color={"currentColor"}
      />
    </s.Button>
  );
};
