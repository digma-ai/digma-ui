import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const FilterContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
