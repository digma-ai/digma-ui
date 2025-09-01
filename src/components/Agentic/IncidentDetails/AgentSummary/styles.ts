import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
  gap: 8px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const ToolContainer = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const ToolSummary = styled.summary`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  padding: 12px 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  cursor: pointer;
`;

export const ToolContent = styled.div`
  padding: 16px;
`;
