import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 0 12px;
  height: 36px;
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
  overflow: hidden;
  scroll-behavior: smooth;
  gap: 12px;
  height: 100%;
`;

export const EnvironmentList = styled.ul`
  display: flex;
  gap: 12px;
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

const rotateAnimation = keyframes`
  15% { transform: rotateY(-40deg); }
  45% { transform: rotateY(40deg); }
  60% { transform: rotateY(0); }
`;

export const LogoRotationContainer = styled.div`
  perspective: 25px;
`;

export const LogoContainer = styled.div`
  animation: ${rotateAnimation} 6s ease-in-out infinite;
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
`;
