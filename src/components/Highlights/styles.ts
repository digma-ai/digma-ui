import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 8px;
  min-height: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
