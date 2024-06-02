import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import {
  CircleProps,
  ContainerProps,
  SwitchContainerProps,
  ToggleSwitchSize
} from "./types";

const PADDING = 2; // in pixels

const getCircleRadius = (size: ToggleSwitchSize): number => {
  switch (size) {
    case "large":
      return 7;
    case "small":
      return 6;
  }
};

const getContentGap = (size: ToggleSwitchSize): number => {
  switch (size) {
    case "large":
      return 8;
    case "small":
      return 4;
  }
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  ${({ $disabled }) =>
    $disabled
      ? css`
          opacity: 0.5;
          pointer-events: none;
        `
      : ""}
`;

const getSwitchContainerColor = (
  theme: DefaultTheme,
  isChecked: boolean,
  isDisabled?: boolean
) => {
  if (isDisabled) {
    return isChecked
      ? theme.colors.v3.surface.brandPrimary
      : theme.colors.v3.surface.sidePanelHeader;
  }

  return isChecked
    ? theme.colors.v3.surface.brandPrimary
    : theme.colors.v3.surface.highlight;
};

export const SwitchContainer = styled.div<SwitchContainerProps>`
  border-radius: ${({ $size }) => getCircleRadius($size) + PADDING}px;
  width: ${({ $size }) => 4 * getCircleRadius($size) + getContentGap($size)}px;
  height: ${({ $size }) => 2 * getCircleRadius($size)}px;
  padding: ${PADDING}px;
  transition: background 300ms;
  display: flex;
  align-items: center;
  background: ${({ $isChecked, theme, $disabled }) =>
    getSwitchContainerColor(theme, $isChecked, $disabled)};
`;

const getCircleColor = (
  theme: DefaultTheme,
  isChecked: boolean,
  isDisabled?: boolean
) => {
  if (isDisabled) {
    return isChecked
      ? theme.colors.v3.surface.brandSecondary
      : theme.colors.v3.surface.highlight;
  }

  return isChecked
    ? theme.colors.v3.icon.primary
    : theme.colors.v3.surface.primary;
};

export const Circle = styled.div<CircleProps>`
  width: ${({ $size }) => 2 * getCircleRadius($size)}px;
  height: ${({ $size }) => 2 * getCircleRadius($size)}px;
  border-radius: 50%;
  box-shadow: 0 0 8.4px 0 rgb(0 0 0 / 12%);
  transition-property: background, margin-left;
  transition-duration: 300ms;
  margin-left: ${({ $isChecked, $size }) =>
    $isChecked ? 2 * getCircleRadius($size) + getContentGap($size) : 0}px;
  background: ${({ $isChecked, theme, $disabled }) =>
    getCircleColor(theme, $isChecked, $disabled)};
`;
