import React, { useCallback, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { ButtonProps } from "./types";

const getIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean
): string => {
  if (isDisabled) {
    return theme.mode === "light" ? "#f1f5fa" : "#7c7c94";
  }

  if (isFocused || isHovered) {
    return "#dadada";
  }

  return "#b9c2eb";
};

export const Button = (props: ButtonProps) => {
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
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <s.ContentContainer>
        {props.icon && (
          <props.icon
            color={getIconColor(
              theme,
              Boolean(props.disabled),
              isHovered,
              isFocused
            )}
          />
        )}
        <span>{props.children}</span>
      </s.ContentContainer>
    </s.Button>
  );
};
