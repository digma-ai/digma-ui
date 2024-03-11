import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  height: 28px;
  box-sizing: border-box;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
