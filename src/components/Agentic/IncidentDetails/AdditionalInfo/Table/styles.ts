import styled from "styled-components";
import type { TableCellContentProps } from "./types";

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TableHead = styled.div`
  font-size: 16px;
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const TableHeadRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
`;

export const TableHeaderCell = styled.div<TableCellContentProps>`
  box-sizing: border-box;
  text-align: ${({ $align }) => $align ?? "left"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TableBodyRow = styled.div`
  display: flex;
  gap: 12px;
  height: 36px;
  align-items: center;
`;

export const TableBodyCell = styled.div<TableCellContentProps>`
  display: flex;
  align-items: center;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
