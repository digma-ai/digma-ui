import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  padding: 12px 16px 0;
  gap: 16px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-self: center;
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 700;
  align-items: flex-end;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const EnvironmentName = styled.span`
  color: #5a5d63;
  font-size: 14px;
  font-weight: 500;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  gap: 8px;
`;

export const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 4px);
  border-radius: 4px;
  padding: 12px;
  gap: 12px;
  box-sizing: border-box;
  overflow: auto;
  height: 231px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;
