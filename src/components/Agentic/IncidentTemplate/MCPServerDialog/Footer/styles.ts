import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.v3.status.high};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;
