import styled from "styled-components";
import {
  bodyBoldTypography,
  caption1MediumTypography
} from "../../../common/App/typographies";
import { StatsProps } from "./types";

export const Stats = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  gap: 8px;
  padding: 8px;
  align-items: stretch;
`;

export const Stat = styled.button<StatsProps>`
  font-family: inherit;
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 8px;
  background: none;
  border: none;

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
    background: none;
    color: ${({ theme }) => theme.colors.v3.text.disabled};
  }

  &:disabled > span {
    color: ${({ theme }) => theme.colors.v3.text.disabled};
  }
`;

export const CriticalStat = styled(Stat)`
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected
        ? theme.colors.v3.status.high
        : theme.colors.v3.status.backgroundHigh};
  background: ${({ theme }) => theme.colors.v3.pieChart.darkRed};

  &:hover:enabled {
    border: 1px solid ${({ theme }) => theme.colors.v3.status.high};
    background: ${({ theme }) => theme.colors.v3.status.backgroundHigh};
  }
`;

export const UnreadStat = styled(Stat)`
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected
        ? theme.colors.v3.stroke.brandPrimary
        : theme.colors.v3.stroke.dark};
  background: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.v3.surface.brandDarkest
      : theme.colors.v3.surface.sidePanelHeader};

  &:hover:enabled {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.brandPrimary};
    background: ${({ theme }) => theme.colors.v3.surface.brandDark};
  }
`;

export const StatCounter = styled.span`
  ${bodyBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  line-height: 18px;
`;

export const StatDescription = styled.span`
  ${caption1MediumTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
