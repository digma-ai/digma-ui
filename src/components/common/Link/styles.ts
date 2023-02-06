import styled from "styled-components";
import theme from "styled-theming";

export const Link = styled.a`
  color: ${theme("mode", {
    light: "#426dda",
    dark: "#7891d0"
  })};
  cursor: pointer;
`;
