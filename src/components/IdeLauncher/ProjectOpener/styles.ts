import styled from "styled-components";

export const EmphasizedText = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`;
