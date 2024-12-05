import { MouseEvent } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = ({
  onClick,
  disabled,
  icon: Icon
}: IconButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };

  return (
    <s.Button onClick={handleClick} disabled={disabled}>
      <Icon color={"currentColor"} size={22} />
    </s.Button>
  );
};
