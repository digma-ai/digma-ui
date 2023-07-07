import styled from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.li<ContainerProps>`
  display: flex;
  position: relative;
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  font-size: 14px;
  padding: 4px 12px;
  user-select: none;
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
  border-bottom: ${({ isSelected }) =>
    isSelected ? "1px solid #5154ec" : "none"};

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

  transition-property: color, font-weight, border;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
`;

export const Label = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 110px;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
`;
