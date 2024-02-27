import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  border-radius: 2px;
  margin: 0;
  cursor: pointer;
  padding: 4px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};

  &:disabled {
    cursor: initial;
  }

  &:hover:enabled,
  &:focus:enabled,
  &:active:enabled {
    background: ${({ theme }) => theme.colors.v3.surface.highlight};
  }
`;
