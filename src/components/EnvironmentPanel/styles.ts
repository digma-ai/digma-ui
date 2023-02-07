import styled, { keyframes } from "styled-components";
import theme from "styled-theming";

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
  background: ${theme("mode", {
    light: "linear-gradient(90deg, #a3aaed 0%, #Dde0ff 50%, #6172fe 100%)",
    dark: "linear-gradient(90deg, #2f3750 0%, #3e489b 48.96%, #7b85d7 100%)"
  })};

  box-shadow: 0px 0px 5px
    rgba(
      167,
      176,
      255,
      ${theme("mode", {
        light: "0.5",
        dark: "0.25"
      })}
    );

  ${/* TODO: Replace with cross-fading backgrounds */ ""}
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 4s ease-in-out infinite;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${theme("mode", {
    light: "#fbfbff",
    dark: "#1e1e1e"
  })};
  padding: 6px 12px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  flex-wrap: wrap;
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
  margin-right: 12px;
`;

export const ViewModeButtonContainer = styled.div`
  margin-left: auto;
`;
