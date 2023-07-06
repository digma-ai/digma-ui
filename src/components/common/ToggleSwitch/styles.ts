import styled from "styled-components";
import {
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
      return 2.5;
  }
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ size }) => {
    switch (size) {
      case "large":
        return "600";
      case "small":
        return "500";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "large":
        return "16px";
      case "small":
        return "10px";
    }
  }};
  line-height: ${({ size }) => {
    switch (size) {
      case "large":
        return "19px";
      case "small":
        return "12px";
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
`;

export const SwitchContainer = styled.div<SwitchContainerProps>`
  border-radius: ${({ size }) => 2 * getCircleRadius(size)}px;
  width: ${({ size }) => 7 * getCircleRadius(size)}px;
  height: ${({ size }) => 4 * getCircleRadius(size)}px;
  transition: background 300ms;
  display: flex;
  align-items: center;
  background: ${({ isChecked, theme }) => {
    switch (theme.mode) {
      case "light":
        return isChecked ? "#3538cd" : "#b9c0d4";
      case "dark":
      case "dark-jetbrains":
        return isChecked ? "#3538cd" : "#7c7c94";
    }
  }};
`;

export const Circle = styled.div<CircleProps>`
  width: ${({ size }) => 2 * getCircleRadius(size)}px;
  height: ${({ size }) => 2 * getCircleRadius(size)}px;
  border-radius: 50%;
  transition-property: background, margin-left;
  transition-duration: 300ms;
  margin-left: ${({ isChecked, size }) =>
    isChecked
      ? `${4 * getCircleRadius(size)}px`
      : `${getCircleRadius(size)}px`};
  background: ${({ isChecked, theme }) => {
    switch (theme.mode) {
      case "light":
        return isChecked ? "#fbfdff" : "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return isChecked ? "#fbfdff" : "#b9c0d4";
    }
  }};
`;
