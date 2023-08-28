import { ThreeDotsIcon } from "../icons/ThreeDotsIcon";

import { useCallback, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { KebabMenuButtonProps } from "./types";

const getIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean
): string => {
  if (isDisabled) {
    return theme.mode === "light" ? "#dadada" : "#49494d";
  }

  if (isFocused || isHovered) {
    return theme.mode === "light" ? "#7c7c94" : "#dadada";
  }

  return theme.mode === "light" ? "#b9c0d4" : "#b9c2eb";
};

export const KebabMenuButton = (props: KebabMenuButtonProps) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <s.Container
      disabled={props.disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <ThreeDotsIcon
        color={getIconColor(
          theme,
          Boolean(props.disabled),
          isHovered,
          isFocused
        )}
        size={14}
      />
    </s.Container>
  );
};
