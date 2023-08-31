import styled from "styled-components";
import { OptionButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 4px;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#c9ccd6";
        case "dark":
        case "dark-jetbrains":
          return "#4e5157";
      }
    }};
`;

export const OptionButton = styled.button<OptionButtonProps>`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  border-radius: 4px;
  padding: 2px 4px;
  cursor: pointer;
  user-select: none;
  color: ${({ theme, selected }) => {
    if (selected) {
      switch (theme.mode) {
        case "light":
          return "#f7f8fa";
        case "dark":
        case "dark-jetbrains":
          return "#dfe1e5";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  background: ${({ selected }) => (selected ? "#5154ec" : "transparent")};
`;
