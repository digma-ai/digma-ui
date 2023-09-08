import styled, { keyframes } from "styled-components";

const BORDER_RADIUS = 8; // in pixels

const backgroundAnimation = keyframes`
	0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const BorderContainer = styled.div`
  padding: 1px;
  border-radius: ${BORDER_RADIUS}px;
  ${/* TODO: Change to radial gradient after cross-fading */ ""}
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "linear-gradient(90deg, #a3aaed 0%, #dde0ff 50%, #6172fe 100%)";
      case "dark":
      case "dark-jetbrains":
        return "linear-gradient(90deg, #2f3750 0%, #3e489b 48.96%, #7b85d7 100%)";
    }
  }};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0px 0px 5px rgb(167 176 255 / 50%)";
      case "dark":
      case "dark-jetbrains":
        return "0px 0px 5px rgb(167 176 255 / 25%)";
    }
  }};
  ${/* TODO: Replace with cross-fading backgrounds */ ""}
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 4s ease-in-out infinite;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
  padding: 5px 12px 6px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
`;

export const EnvironmentListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  scroll-behavior: smooth;
  gap: 12px;
`;

export const EnvironmentList = styled.ul`
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 1px 0 0 1px;
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

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  height: 100%;

  &:disabled {
    cursor: initial;
  }
`;

export const ViewModeButtonContainer = styled.div`
  margin-left: auto;
`;
