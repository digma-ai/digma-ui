import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  min-height: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
