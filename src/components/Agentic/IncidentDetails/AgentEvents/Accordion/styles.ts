import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  border-radius: 8px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const Summary = styled.div`
  background-color: ${({ theme }) => theme.colors.v3.surface.secondary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 8px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const Content = styled.div`
  padding: 8px;
`;
