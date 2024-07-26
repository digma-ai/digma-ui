import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const Content = styled.div`
  padding: 32px;
  display: flex;
  gap: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border-radius: 12px;
  width: 100%;
`;
