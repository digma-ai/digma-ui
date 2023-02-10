import styled from "styled-components";

export const Button = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI",
    system-ui, "Ubuntu", "Droid Sans", sans-serif;
  font-weight: 500;
  font-size: 10px;
  padding: 2px 4px;
  height: 16px;
  border-radius: 2px;
  border: none;
  color: #b9c2eb;
  background: #3538cd;
  cursor: pointer;

  &:hover {
    color: #dadada;
    background: #5154ec;
  }

  &:focus {
    color: #dadada;
    background: #3538cd;
  }

  &:disabled {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
          return "#7c7c94";
      }
    }};
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
          return "#49494d";
      }
    }};
    cursor: initial;
  }
`;

export const ContentContainer = styled.span`
  display: flex;
`;

export const Label = styled.span`
  margin-left: 4px;
`;
