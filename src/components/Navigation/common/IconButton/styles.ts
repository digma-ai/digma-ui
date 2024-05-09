import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 13%);
  padding: 0;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  cursor: pointer;
  outline: none;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  flex-shrink: 0;

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
    cursor: initial;
  }

  &:hover:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
  }

  &:active:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  }
`;
