import styled from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.button<ContainerProps>`
  position: relative;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  font-size: 14px;
  padding: 4px 12px;
  white-space: nowrap;

  color: ${({ isSelected, theme }) => {
    if (isSelected) {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
          return "#b9c2eb";
        case "dark-jetbrains":
          return "#dadada";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
        return "#7c7c94";
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};

  background: ${({ isSelected, theme }) => {
    if (!isSelected) {
      return "none";
    }

    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};

  &:hover {
    font-weight: 700;
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
          return "#b9c2eb";
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  ${({ isSelected }) => {
    if (isSelected) {
      return `border-bottom: 1px solid #5154ec`;
    }
  }}
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
`;
