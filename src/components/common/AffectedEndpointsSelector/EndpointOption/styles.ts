import styled, { css } from "styled-components";
import { footnoteRegularTypography } from "../../App/typographies";
import { CopyButton } from "../../v3/CopyButton";
import type { EndpointNameProps } from "./types";

export const StyledCopyButton = styled(CopyButton)`
  display: none;
  padding: 0;
`;

export const Container = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const EndpointName = styled.div<EndpointNameProps>`
  display: flex;
  gap: 4px;
  overflow: hidden;
  border-radius: 4px;
  ${({ $selected }) => {
    if (!$selected) {
      return css`
        width: 100%;
        padding: 4px 8px;
        ${ServiceName} {
          flex-shrink: 0;
          width: 151px;
          max-width: none;
        }
      `;
    }
    return null;
  }}

  ${({ $clickable }) =>
    $clickable
      ? css`
          &:hover {
            background: ${({ theme }) => theme.colors.v3.surface.highlight};
          }
        `
      : ""}
`;

export const ServiceName = styled.span`
  max-width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;
