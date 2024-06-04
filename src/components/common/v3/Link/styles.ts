import styled, { css } from "styled-components";
import { footnoteRegularTypography } from "../../App/typographies";
import { LinkElementProps } from "./types";

export const Link = styled.a<LinkElementProps>`
  ${footnoteRegularTypography}

  cursor: pointer;
  text-decoration: none;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
  color: ${({ theme }) => theme.colors.v3.text.link};

  &:hover {
    color: ${({ theme }) => theme.colors.v3.text.primary};
  }

  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.v3.text.link};
  }

  ${({ $disabled }) =>
    $disabled
      ? css`
          color: ${({ theme }) => theme.colors.v3.text.disabled};
          pointer-events: none;
        `
      : ""}
`;
