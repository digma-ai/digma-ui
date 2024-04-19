import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  animation: ${rotateAnimation} 1.5s linear infinite;
  color: ${({ theme }) => theme.colors.v3.stroke.brandSecondary};
`;
