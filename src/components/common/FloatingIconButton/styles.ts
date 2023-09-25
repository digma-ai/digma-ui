import styled from "styled-components";

export const Button = styled.button`
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  user-select: none;
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "1px 1px 3px rgb(0 0 0 / 15%)";
      case "dark":
      case "dark-jetbrains":
        return "1px 1px 4px rgb(0 0 0 / 25%)";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#fbfdff";
        case "dark":
        case "dark-jetbrains":
          return "#383838";
      }
    }};
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
    color: #7891d0;
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

  &:active {
    color: #b9c2eb;
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#2e2e2e";
      }
    }};
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#fbfdff";
          case "dark":
          case "dark-jetbrains":
            return "#383838";
        }
      }};
  }

  &:disabled {
    cursor: initial;
    color: #49494d;
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#2e2e2e";
      }
    }};
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#fbfdff";
          case "dark":
          case "dark-jetbrains":
            return "#383838";
        }
      }};
  }
`;
