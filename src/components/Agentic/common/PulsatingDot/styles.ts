import styled, { keyframes } from "styled-components";

const pulsate = keyframes`
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.v3.text.white};
  animation: ${pulsate} 1s infinite alternate;
`;
