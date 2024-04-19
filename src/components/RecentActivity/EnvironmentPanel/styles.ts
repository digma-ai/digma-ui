import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 0 12px;
  height: 44px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.tabPanel.background};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 5px 10px 0 rgb(0 0 0 / 15%)";
      case "dark":
      case "dark-jetbrains":
        return "0 9px 24px 0 rgb(0 0 0 / 30%)";
    }
  }};
`;

export const EnvironmentListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 12px;
  height: 100%;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EnvironmentList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

export const CarouselButtonContainer = styled.div`
  width: 12px;
`;

export const CarouselButton = styled.button`
  display: flex;
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  color: ${({ theme, disabled }) => {
    switch (theme.mode) {
      case "light":
        return disabled ? "#b9c0d4" : "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return disabled ? "#7c7c94" : "#e2e7ff";
    }
  }};

  &:disabled {
    cursor: initial;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
`;

export const Divider = styled.div`
  margin: 0 8px;
  border-radius: 1px;
  width: 1px;
  height: 13px;
  background: ${({ theme }) => theme.colors.tabPanel.divider};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 4px;
  align-items: center;
`;

export const ObservabilityListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
`;

export const ObservabilityToggleSwitchContainer = styled.div`
  margin-left: auto;
`;
