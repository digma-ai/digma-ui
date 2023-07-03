import styled from "styled-components";

export const Change = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 400;

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
