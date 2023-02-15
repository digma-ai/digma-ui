import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI",
      system-ui, "Ubuntu", "Droid Sans", sans-serif;
  }
`;
