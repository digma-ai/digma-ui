import styled from "styled-components";
import type { DefaultTheme } from "styled-components/dist/types";
import type {
  CircleProps,
  ContainerProps,
  SwitchContainerProps,
  ToggleSwitchSize
} from "./types";

const getCircleRadius = (size: ToggleSwitchSize): number => {
  switch (size) {
    case "large":
      return 5;
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
  font-weight: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "600";
      case "small":
        return "500";
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "16px";
      case "small":
        return "14px";
    }
  }};
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
  ${({ $disabled }) => {
    if ($disabled) {
      return "pointer-events: none;";
    }
  }}
`;

const getSwitchContainerColor = (
  theme: DefaultTheme,
  isChecked: boolean,
  isDisabled?: boolean
) => {
  if (isDisabled) {
    switch (theme.mode) {
      case "light":
        return isChecked ? "#4B4DB4" : "#E6E8F2";
      case "dark":
      case "dark-jetbrains":
        return isChecked ? "#4B4DB4" : "#27282E";
    }
  }

  switch (theme.mode) {
    case "light":
      return isChecked ? "#4B4DB4" : "#D3D6E5";
    case "dark":
    case "dark-jetbrains":
      return isChecked ? "#3538cd" : "#37383F";
  }
};

export const SwitchContainer = styled.div<SwitchContainerProps>`
  border-radius: ${({ $size }) => 2 * getCircleRadius($size)}px;
  width: ${({ $size }) => 7 * getCircleRadius($size)}px;
  height: ${({ $size }) => 4 * getCircleRadius($size)}px;
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
    switch (theme.mode) {
      case "light": {
        return isChecked ? "#7C90F8" : "#E6E8F2";
      }
      case "dark":
      case "dark-jetbrains":
        return isChecked ? "#7C90F8" : "#2C2E33";
    }
  }

  switch (theme.mode) {
    case "light": {
      return isChecked ? "#fbfdff" : "#f1f5fa";
    }
    case "dark":
    case "dark-jetbrains": {
      return isChecked ? "#F0F1F7" : "#222326";
    }
  }
};

export const Circle = styled.div<CircleProps>`
  width: ${({ $size }) => 2 * getCircleRadius($size)}px;
  height: ${({ $size }) => 2 * getCircleRadius($size)}px;
  border-radius: 50%;
  box-shadow: 0 0 8.4px 0 rgb(0 0 0 / 12%);
  transition-property: background, margin-left;
  transition-duration: 300ms;
  margin-left: ${({ $isChecked, $size }) =>
    $isChecked
      ? `${4 * getCircleRadius($size)}px`
      : `${getCircleRadius($size)}px`};
  background: ${({ $isChecked, theme, $disabled }) =>
    getCircleColor(theme, $isChecked, $disabled)};
`;
