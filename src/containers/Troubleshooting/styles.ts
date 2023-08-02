import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#3d3f41";
      }
    }};
  }
`;
