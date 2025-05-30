import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  overflow: hidden;
  gap: 8px;
`;

export const ChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  flex-grow: 1;
  padding: 8px;
`;

export const HumanMessage = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
  padding: 8px;
  border-radius: 8px;
  align-self: flex-end;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
