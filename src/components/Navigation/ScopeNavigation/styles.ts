import styled from "styled-components";

export const NavigationButton = styled.button`
  height: 28px;
  width: 28px;

  &:not([disabled]) {
    border: none;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;
