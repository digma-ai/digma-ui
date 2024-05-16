import styled from "styled-components";

export const Container = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  height: 20px;
`;
