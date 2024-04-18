import styled from "styled-components";

export const Button = styled.button`
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  user-select: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
  }

  &:active {
    color: ${({ theme }) => theme.colors.v3.icon.brandTertiary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;
