import styled from "styled-components";

export const Link = styled.a`
  font-size: 8px;
  line-height: 10px;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};

  &:hover,
  &:focus {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }};
  }

  &:active {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
        case "dark-jetbrains":
          return "#7891d0";
      }
    }};
  }

  &:disabled {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }
`;
