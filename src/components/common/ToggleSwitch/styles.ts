import styled from "styled-components";
import { CircleProps, SwitchContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  gap: 10px;
  padding: 8px 2px 8px 0;
  align-items: center;
  cursor: pointer;
  user-select: none;

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
  border-radius: 8px;
  width: 28px;
  height: 16px;
  transition-property: background;
  transition-duration: 0.3s;
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
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition-property: background, margin-left;
  transition-duration: 0.3s;

  margin-left: ${({ isChecked }) => (isChecked ? "16px" : "4px")};
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
