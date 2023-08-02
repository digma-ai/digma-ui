import styled from "styled-components";
import { ButtonProps, ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};

  &:hover {
    border: 1px solid
      ${({ theme, disabled }) => {
        if (disabled) {
          return "transparent";
        }

        switch (theme.mode) {
          case "light":
            return "#b9c2eb";
          case "dark":
          case "dark-jetbrains":
            return "#49494d";
        }
      }};
  }

  &:active {
    border: 1px solid
      ${({ theme, disabled }) => {
        if (disabled) {
          return "transparent";
        }

        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#7c7c94";
        }
      }};
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const IconContainer = styled.span<ButtonProps>`
  display: flex;
  flex-shrink: 0;
  height: 72px;
  width: 72px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#3c3c3c";
    }
  }};
`;

export const TextContainer = styled.span`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const Title = styled.span<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;
