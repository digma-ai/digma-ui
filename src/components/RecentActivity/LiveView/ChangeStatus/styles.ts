import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  gap: 4px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#e2e7ff";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#d0d6eb";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;

export const EvaluatingBadge = styled.span`
  margin-left: 8px;
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
