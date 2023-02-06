import { useCallback, useState } from "react";
import * as s from "./styles";
import { IconButtonProps } from "./types";

const getIconColor = (
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean
): string => {
  if (isDisabled) {
    return "#49494d";
  }

  if (isFocused || isHovered) {
    return "#dadada";
  }

  return "#7c7c94";
};

export const IconButton = (props: IconButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick(e);
  };

  return (
    <s.Button
      onClick={handleClick}
      disabled={props.disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <props.icon
        color={getIconColor(Boolean(props.disabled), isHovered, isFocused)}
        size={22}
      />
    </s.Button>
  );
};
