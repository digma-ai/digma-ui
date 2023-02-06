import styled from "styled-components";
import theme from "styled-theming";

export const Button = styled.button`
  width: 22px;
  height: 22px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background: ${theme("mode", {
      light: "#f1f5fa",
      dark: "#49494d"
    })};
  }

  &:disabled {
    background: transparent;
    cursor: initial;
  }
`;
