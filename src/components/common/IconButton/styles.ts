import styled from "styled-components";

export const Button = styled.button`
  width: 22px;
  height: 22px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
          return "#49494d";
      }
    }};
  }

  &:disabled {
    background: transparent;
    cursor: initial;
  }
`;
