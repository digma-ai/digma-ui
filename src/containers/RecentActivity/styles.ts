import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
          return "#0f0f0f";
        case "dark-jetbrains":
          return "#383838";
      }
    }};
  }
`;
