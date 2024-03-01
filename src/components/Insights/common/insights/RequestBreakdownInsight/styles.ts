import styled from "styled-components";
import { caption1RegularTypography } from "../../../../common/App/typographies";
import {
  FractionProgressBarValueProps,
  LegendItemDataColorBadgeProps
} from "./types";

const PROGRESS_BAR_HEIGHT = 6; // in pixels
const PROGRESS_BAR_VALUE_HEIGHT = 2; // in pixels

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 4px;
`;

export const PieChartContainer = styled.div`
  padding: 3px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
`;

export const LegendItem = styled.div`
  ${caption1RegularTypography}

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LegendItemDataColorBadge = styled.div<LegendItemDataColorBadgeProps>`
  height: 10px;
  width: 10px;
  border-radius: 1px;
  background: ${({ $colors }) => $colors.background};
  border: 2px solid ${({ $colors }) => $colors.border};
  box-sizing: border-box;
`;

export const LegendItemDataLabel = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const LegendItemDataValue = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 8px;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const TableHeaderCell = styled.th`
  ${caption1RegularTypography}

  &:first-child {
    text-align: start;
    padding-left: 8px;
  }

  &:last-child {
    text-align: end;
    padding-right: 8px;
  }
`;

export const TableBodyRow = styled.tr`
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
`;

export const TableBodyCell = styled.td`
  &:first-child {
    border-radius: 4px 0 0 4px;
    padding: 6px 4px 6px 8px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
    width: 100%;
    padding: 6px 4px;
  }
`;

export const CategoryName = styled.span`
  ${caption1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  white-space: nowrap;
`;

export const RequestTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FractionProgressBar = styled.div`
  height: ${PROGRESS_BAR_HEIGHT}px;
  border-radius: ${PROGRESS_BAR_HEIGHT / 2}px;
  flex-grow: 1;
  position: relative;
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export const FractionProgressBarValue = styled.div<FractionProgressBarValueProps>`
  width: ${({ $value }) => Math.floor($value * 100)}%;
  height: ${PROGRESS_BAR_VALUE_HEIGHT}px;
  border-radius: ${PROGRESS_BAR_VALUE_HEIGHT / 2}px;
  background: ${({ theme }) => theme.colors.v3.text.secondary};
`;
