import { createGlobalStyle } from "styled-components";
import { getMainFont } from "../App/styles";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    background: #3d3f41;
  }

  body {
    margin: 0;
    padding: 0;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: ${({ theme }) => getMainFont(theme.mainFont)};
  }
`;
