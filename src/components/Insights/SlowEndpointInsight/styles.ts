import styled from "styled-components";

export const Description = styled.span`
  font-size: 14px;
  line-height: 17px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#70787d";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;
