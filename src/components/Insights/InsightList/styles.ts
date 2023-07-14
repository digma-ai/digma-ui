import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  flex-grow: 1;
`;

export const InsightGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InsightGroupName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  height: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const MissingDependencyContainer = styled.div`
  display: flex;
  gap: 6px;
`;

export const MissingDependencyText = styled.span`
  font-size: 10px;
  line-height: normal;
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
