import styled, { css } from "styled-components";
import { bodyRegularTypography } from "../../App/typographies";
import { CopyButton } from "../../v3/CopyButton";
import { Link as CommonLink } from "../../v3/Link";
import type {
  EndpointNameProps,
  ServiceNameProps,
  SpanLinkProps
} from "./types";

export const StyledCopyButton = styled(CopyButton)`
  display: none;
  padding: 0;
`;

export const Container = styled.div`
  ${bodyRegularTypography}

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
          width: 30%;
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

export const ServiceName = styled.span<ServiceNameProps>`
  max-width: 100px;
  min-width: 30px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.v3.text.secondary : theme.colors.v3.text.tertiary};
`;

export const Route = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RouteLink = styled(CommonLink)<SpanLinkProps>`
  ${bodyRegularTypography}

  ${({ $selected }) =>
    $selected
      ? css`
          width: 100%;
        `
      : css`
          display: inline;
        `}
`;

export const Duration = styled.span`
  flex-shrink: 0;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
