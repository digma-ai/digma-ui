import { useCallback, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { IconButtonProps } from "./types";

const getIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean
): string | undefined => {
  if (isDisabled) {
    return theme.mode === "light" ? "#b9c0d4" : "#49494d";
  }

  if (isFocused || isHovered) {
    return theme.mode === "light" ? "#002d61" : "#dadada";
  }
};

export const IconButton = (props: IconButtonProps) => {
  const theme = useTheme();

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
        color={getIconColor(
          theme,
          Boolean(props.disabled),
          isHovered,
          isFocused
        )}
        size={22}
      />
    </s.Button>
  );
};
