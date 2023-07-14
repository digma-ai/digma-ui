import React, { useCallback, useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { ButtonProps, ButtonType } from "./types";

const getIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean,
  isPressed: boolean,
  buttonType: ButtonType
): string => {
  if (buttonType === "tertiary") {
    if (isDisabled) {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }

    if (isPressed) {
      switch (theme.mode) {
        case "light":
          return "#5154ec";
        case "dark":
        case "dark-jetbrains":
          return "#7891d0";
      }
    }

    if (isHovered || isFocused) {
      switch (theme.mode) {
        case "light":
          return "#5154ec";
        case "dark":
        case "dark-jetbrains":
          return "#92affa";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#3538cd";
      case "dark":
      case "dark-jetbrains":
        return "#e2e7ff";
    }
  }

  if (buttonType === "secondary") {
    if (isDisabled) {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }

    if (isPressed) {
      switch (theme.mode) {
        case "light":
          return "#3538cd";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }

    if (isHovered || isFocused) {
      switch (theme.mode) {
        case "light":
          return "#5154ec";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#3538cd";
      case "dark":
      case "dark-jetbrains":
        return "#e2e7ff";
    }
  }

  if (isDisabled) {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#49494d";
    }
  }

  if (isPressed) {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }

  if (isFocused || isHovered) {
    return "#e2e7ff";
  }

  return "#e2e7ff";
};

export const Button = (props: ButtonProps) => {
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

  const buttonType = props.buttonType || "primary";

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
      buttonType={buttonType}
    >
      <s.ContentContainer>
        {props.icon && (
          <props.icon.component
            size={props.icon.size}
            color={
              props.icon.color ||
              getIconColor(
                theme,
                Boolean(props.disabled),
                isHovered,
                isFocused,
                isPressed,
                buttonType
              )
            }
          />
        )}
        <span>{props.children}</span>
      </s.ContentContainer>
    </s.Button>
  );
};
