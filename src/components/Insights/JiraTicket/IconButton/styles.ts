import styled from "styled-components";

export const Button = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 4px;
  cursor: pointer;
  display: flex;
  color: ${({ theme }) => theme.colors.field.icon};
`;
