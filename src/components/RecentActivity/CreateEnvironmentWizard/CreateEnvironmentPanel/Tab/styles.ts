import styled from "styled-components";
import {
  caption2BoldTypography,
  footnoteRegularTypography
} from "../../../../common/App/typographies";
import type { IndexProps, NameProps } from "./types";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Index = styled.div<IndexProps>`
  display: flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  justify-content: center;
  border-radius: 12px;
  align-items: center;
  ${({ $state, theme }) => {
    switch ($state) {
      case "active":
        return `background: ${theme.colors.v3.surface.brandPrimary};`;
      case "not-completed":
        return `border: 1px solid ${theme.colors.v3.surface.highlight};`;
      case "completed":
        return `border: 1px solid ${theme.colors.v3.status.success};`;
      default:
        return "";
    }
  }};

  ${caption2BoldTypography}
`;

export const Name = styled.div<NameProps>`
  ${footnoteRegularTypography}
  display: flex;
  opacity: ${({ $isActive }) => (!$isActive ? 0.5 : 1)};
`;

export const CheckMarkIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.success};
`;

export const ErrorIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.high};
`;
