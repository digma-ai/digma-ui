import styled from "styled-components";

export const Button = styled.button`
  width: 22px;
  height: 22px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};

  &:hover {
    border-radius: 4px;
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }

  &:hover,
  &focus {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  &:disabled {
    background: transparent;
    cursor: initial;
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
