import styled, { keyframes } from "styled-components";

const blurAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const AnimatedPromotionBackground = styled.div`
  position: absolute;
  top: 0;
  animation: 1s ${blurAnimation} linear infinite alternate;
`;
