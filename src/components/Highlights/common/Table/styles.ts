import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import type { TableCellContentProps } from "./types";

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 0 4px;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding-bottom: 4px;
`;

export const TableHeaderCell = styled.th`
  ${footnoteRegularTypography}

  padding: 0 2px;
  vertical-align: top;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

export const TableCellContent = styled.div<TableCellContentProps>`
  display: flex;
  gap: 4px;
  align-items: center;
  text-align: ${({ $align = "left" }) => $align};
  justify-content: ${({ $align }) => {
    switch ($align) {
      case "right":
        return "flex-end";
      case "center":
        return "center";
      case "left":
      default:
        return "flex-start";
    }
  }};
`;

export const TableHeaderCellContent = styled(TableCellContent)`
  ${footnoteRegularTypography}
`;

export const TableBodyRow = styled.tr`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 28px;

  &:hover {
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
    cursor: pointer;
  }
`;

export const TableBodyCell = styled.td`
  padding: 0 2px;

  &:first-child {
    padding-left: 0;
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    padding-right: 0;
    border-radius: 0 4px 4px 0;
  }
`;

export const EnvironmentNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
