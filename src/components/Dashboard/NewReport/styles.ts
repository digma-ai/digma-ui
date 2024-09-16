import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: fit-content;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  padding: 24px;
  gap: 24px;
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
