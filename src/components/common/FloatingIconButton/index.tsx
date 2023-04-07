import React, { useCallback, useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { FloatingIconButtonProps } from "./types";

const getIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean,
  isPressed: boolean
): string => {
  if (isDisabled) {
    return "#49494d";
  }

  if (isPressed) {
    return "#b9c2eb";
  }

  if (isFocused || isHovered) {
    return "#7891d0";
  }

  switch (theme.mode) {
    case "light":
      return "#7891D0";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
  }
};

export const FloatingIconButton = (props: FloatingIconButtonProps) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const handleMouseDown = useCallback(() => setIsPressed(true), []);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsPressed(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
    >
      <props.icon.component
        size={props.icon.size}
        color={
          props.icon.color ||
          getIconColor(
            theme,
            Boolean(props.disabled),
            isHovered,
            isFocused,
            isPressed
          )
        }
      />
    </s.Button>
  );
};
