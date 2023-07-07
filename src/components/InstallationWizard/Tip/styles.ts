import styled from "styled-components";

export const TipContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 4px;
  font-weight: 500;
  font-size: 12px;
  margin-top: 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const TipIconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;
