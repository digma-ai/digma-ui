import styled from "styled-components";

export const Description = styled.span`
  font-size: 10px;
  line-height: normal;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;
