import styled from "styled-components";
import {
  bodyRegularTypography,
  footnoteBoldTypography
} from "../../common/App/typographies";
import { CopyButton } from "../../common/v3/CopyButton";
import { Bar } from "../common/Bar";
import { Popup } from "../common/Popup";

export const ScopeBar = styled(Bar)`
  ${bodyRegularTypography}

  align-items: center;
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const SpanIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};
`;

export const StyledCopyButton = styled(CopyButton)`
  display: none;
  padding: 2px 4px;
`;

export const ScopeNameContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const ScopeName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;
  user-select: none;
`;

export const ScopeNamePlaceholder = styled(ScopeName)`
  ${footnoteBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  text-transform: uppercase;
`;

export const ScopeBarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  padding: 2px 4px;

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
    cursor: initial;
  }

  &:active:enabled,
  &:hover:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
  }
`;

export const LinkedEndpointsPopup = styled(Popup)`
  margin: 4px 8px;
`;
