import styled from "styled-components";
import {
  subheading1BoldTypography,
  subheading1RegularTypography
} from "../../../common/App/typographies";
import { TableBodyCellProps, TableCellContentProps } from "./types";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  ${subheading1RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  height: 70px;
`;

export const TableCellContent = styled.div<TableCellContentProps>`
  padding: 16px;
  text-align: ${({ $align = "left" }) => $align};
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const TableHeaderCellContent = styled(TableCellContent)`
  display: flex;
  align-items: center;
  gap: 4px;
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
  ${({ onClick }) => (onClick ? "cursor: pointer;" : "")}
`;

export const TableHeaderTitle = styled.span`
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SortingOrderIconContainer = styled.div`
  display: flex;
`;

export const TableBodyRow = styled.tr`
  ${subheading1BoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 70px;

  &:hover {
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  }
`;

export const TableBodyCell = styled.td<TableBodyCellProps>`
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  background: ${({ $severity }) => {
    switch ($severity) {
      case "Top":
        return "radial-gradient(1166.07% 138.62% at 0% 0%, #B92B2B 0%, #B95E2B 100%)";
      case "High":
        return "radial-gradient(129.2% 111.8% at 0% 0%, #B95E2B 0%, #B9A22B 100%)";
      case "Medium":
        return "radial-gradient(408.61% 111.8% at 0% 0%, #B9A22B 0%, #6AB92B 100%)";
      case "Low":
        return "radial-gradient(408.61% 111.8% at 0% 0%, #6AB92B 0%, #2BB997 100%)";
      default:
        return "transparent";
    }
  }};
`;

export const HoverableContentContainer = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const NavigationLinkContainer = styled.div<{ $withChevron?: boolean }>`
  ${subheading1RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.link};
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: ${({ $withChevron }) =>
    $withChevron ? "space-between" : "center"};
`;
