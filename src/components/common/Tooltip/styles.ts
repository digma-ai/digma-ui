import styled from "styled-components";

export const TooltipContainer = styled.div`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0 0 0 / 15%);
  font-size: 14px;
  word-break: break-all;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;
