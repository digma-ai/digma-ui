import styled, { keyframes } from "styled-components";
import type { InnerCircleProps, OuterCircleProps } from "./types";

const rotateAnimation = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
`;

export const OuterCircle = styled.div<OuterCircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    ${({ $startColor }) => $startColor} 0deg,
    ${({ $endColor }) => $endColor} 360deg
  );
  animation: ${rotateAnimation} 1s linear infinite;
`;

export const InnerCircle = styled.div<InnerCircleProps>`
  width: 83%;
  height: 83%;
  border-radius: 50%;
  background: ${({ $background }) => $background};
`;
