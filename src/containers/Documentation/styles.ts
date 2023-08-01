import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#fff";
        case "dark":
        case "dark-jetbrains":
          return "#1e1e1e";
      }
    }};
  }
`;
