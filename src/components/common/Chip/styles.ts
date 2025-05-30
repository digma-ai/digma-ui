import styled, { css } from "styled-components";
import { bodyRegularTypography } from "../App/typographies";

export const activeStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  box-shadow: 0 0 4.9px 0 rgb(0 0 0 / 13%);
`;

export const Container = styled.button`
  ${bodyRegularTypography}

  font-family: inherit;
  height: 28px;
  width: fit-content;
  box-sizing: border-box;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);
  display: flex;
  align-items: center;
  padding: 4px 8px;
  overflow: hidden;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  transition: all 500ms;

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.text.disabled};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  }

  &:hover:enabled {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
    background: ${({ theme }) => theme.colors.v3.surface.highlight};
    box-shadow: 0 0 4.9px 0 rgb(0 0 0 / 13%);
  }

  &:active:enabled {
    ${activeStyles}
  }
`;

export const Label = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
