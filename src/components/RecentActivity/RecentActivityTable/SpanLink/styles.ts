import styled from "styled-components";
import { getCodeFont } from "../../../common/App/styles";

// postcss-styled-components-disable-next-line
export const Link = styled.a`
  ${({ theme }) => getCodeFont(theme.codeFont)}

  font-size: 12px;
  cursor: pointer;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};
`;
