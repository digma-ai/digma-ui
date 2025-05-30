import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
