import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { v3colors } from "../../../common/App/v3colors";
import { IndicatorProps } from "./types";

export const Container = styled.div`
  padding: 5px 8px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Indicator = styled.div<IndicatorProps>`
  border-radius: 10px;
  width: 6px;
  height: 6px;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case "live":
        return v3colors.green[200];
      case "recent":
        return v3colors.green[300];
      case "active":
        return v3colors.green[350];
      case "inactive":
        return theme.colors.v3.icon.secondary;
      case "stale":
        return theme.colors.v3.icon.disabled;
      default:
        return "currentColor";
    }
  }};
`;

export const Description = styled.div`
  text-transform: capitalize;
  ${subscriptRegularTypography}
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const InfoContainer = styled.div`
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Row = styled.div`
  display: flex;
  gap: 4px;
`;
