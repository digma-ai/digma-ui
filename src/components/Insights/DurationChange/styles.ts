import styled from "styled-components";

export const Change = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9da0a8";
    }
  }};
`;
