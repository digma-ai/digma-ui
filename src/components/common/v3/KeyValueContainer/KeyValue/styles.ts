import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Key = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
