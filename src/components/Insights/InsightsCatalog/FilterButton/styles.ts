import styled from "styled-components";
import { footnoteRegularTypography } from "../../../common/App/typographies";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.v3.icon.brandPrimary
      : theme.colors.v3.text.tertiary};
`;

export const ButtonContentContainer = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const FilterCounter = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.text.white};
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  min-width: 16px;
  min-height: 16px;
  padding: 0 4px;
  box-sizing: border-box;
`;
