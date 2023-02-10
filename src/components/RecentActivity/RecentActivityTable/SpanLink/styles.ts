import styled from "styled-components";

export const Link = styled.a`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
        return "#7891d0";
    }
  }};
  font-size: 12px;
  cursor: pointer;
`;
