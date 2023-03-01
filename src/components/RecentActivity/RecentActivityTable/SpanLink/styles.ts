import styled from "styled-components";
import { getCodeFont } from "../../../App/styles";

export const Link = styled.a`
  ${({ theme }) => getCodeFont(theme.codeFont)}
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};
  font-size: 12px;
  cursor: pointer;
`;
