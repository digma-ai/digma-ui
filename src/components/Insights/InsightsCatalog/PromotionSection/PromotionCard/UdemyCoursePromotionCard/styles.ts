import styled, { keyframes } from "styled-components";

const blurAnimation = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  60% { opacity: 1; }
  100% { opacity: 1; }
`;

export const AnimatedPromotionBackground = styled.div`
  position: absolute;
  top: 0;
  animation: 5s ${blurAnimation} linear infinite alternate;
`;
