import styled from "styled-components";
import { footnoteRegularTypography } from "../../common/App/typographies";
import { Bar } from "../common/Bar";
import type { EnvironmentBarElementProps } from "./types";

export const ChevronIconContainer = styled.div`
  margin-left: auto;
  display: flex;
  padding: 0 6px;
`;

export const EnvironmentBar = styled(Bar)<EnvironmentBarElementProps>`
  ${footnoteRegularTypography}

  gap: 4px;
  align-items: center;
  user-select: none;
  background: ${({ theme }) => theme.colors.surface.primary};
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};

  & ${ChevronIconContainer} {
    color: ${({ theme, $isDisabled }) =>
      $isDisabled
        ? theme.colors.v3.icon.disabled
        : theme.colors.v3.icon.secondary};
  }
`;

export const EnvironmentIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};
  opacity: 0.5;
`;

export const SelectedEnvironmentName = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
