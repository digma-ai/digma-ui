import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  justify-content: space-between;
`;

export const Key = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
