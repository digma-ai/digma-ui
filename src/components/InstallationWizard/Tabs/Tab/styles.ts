import styled from "styled-components";
import { TabProps } from "./types";

export const Container = styled.li<TabProps>`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  padding: 9px 10px;
  display: flex;
  gap: 4px;
  user-select: none;
  cursor: ${({ isDisabled }) => (isDisabled ? "initial" : "pointer")};
  border-bottom: ${({ isSelected }) =>
    isSelected ? "3px solid #5154ec" : "none"};
  color: ${({ theme, isSelected, isDisabled }) => {
    switch (theme.mode) {
      case "light":
        return isDisabled ? "#b9c0d4" : isSelected ? "#002d61" : "#828797";
      case "dark":
      case "dark-jetbrains":
        return isDisabled ? "#49494d" : isSelected ? "#dadada" : "#9b9b9b";
    }
  }};

  ${({ fullWidth }) =>
    fullWidth &&
    `
    flex-grow: 1;
    flex-basis: 0;
    justify-content: center;
  `}

  &:hover,
  &:focus {
    color: ${({ theme, isDisabled }) => {
      switch (theme.mode) {
        case "light":
          return isDisabled ? "#b9c0d4" : "#002d61";
        case "dark":
        case "dark-jetbrains":
          return isDisabled ? "#49494d" : "#dadada";
      }
    }};
  }
`;
