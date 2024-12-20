import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const WidgetsContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow: auto;
`;
