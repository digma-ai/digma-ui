import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const InsightIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 2px;
  border-radius: 4px;
  position: relative;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#dfe1e5";
      case "dark":
      case "dark-jetbrains":
        return "#43454a";
    }
  }};
`;

export const MissingDependencyContainer = styled.div`
  display: flex;
  gap: 6px;
`;

export const MissingDependencyText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }};
`;
