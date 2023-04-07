import { useCallback, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { TabProps } from "./types";

const getIconColor = (
  theme: DefaultTheme,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean,
  isSelected: boolean
): string => {
  if (isDisabled) {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
      case "dark-jetbrains":
        return "#49494d";
    }
  }

  if (isSelected || isFocused || isHovered) {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }

  switch (theme.mode) {
    case "light":
      return "#828797";
    case "dark":
    case "dark-jetbrains":
      return "#9b9b9b";
  }
};

export const Tab = (props: TabProps) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const handleContainerClick = () => {
    if (!props.isDisabled) {
      props.onClick();
    }
  };
  return (
    <s.Container
      isDisabled={props.isDisabled}
      isSelected={props.isSelected}
      onClick={handleContainerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {props.icon && (
        <props.icon
          size={14}
          color={getIconColor(
            theme,
            Boolean(props.isDisabled),
            isHovered,
            isFocused,
            props.isSelected
          )}
        />
      )}
      {props.children}
    </s.Container>
  );
};
