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
  align-items: center;
  gap: 4px;
  color: ${({ isPending, isSelected, theme }) => {
    if (isSelected) {
      switch (theme.mode) {
        case "light":
          return "#494b57";
        case "dark":
          return "#b9c2eb";
        case "dark-jetbrains":
          return "#dfe1e5";
      }
    }

    if (isPending) {
      switch (theme.mode) {
        case "light":
          return "#c9ccd6";
        case "dark":
        case "dark-jetbrains":
          return "#5a5d63";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
        return "#7c7c94";
      case "dark-jetbrains":
        return "#b4b8bf";
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
          return "#dfe1e5";
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
