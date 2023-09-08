import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

export const InsightGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InsightGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const InsightGroupIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InsightGroupName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
