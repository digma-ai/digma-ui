import styled from "styled-components";
import type { KebabMenuButtonProps } from "./types";

export const Container = styled.div<KebabMenuButtonProps>`
  width: 14px;
  height: 14px;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};

  &:hover,
  &:focus {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#7c7c94";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  &:disabled {
    cursor: initial;
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#dadada";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }
`;
