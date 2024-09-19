import styled from "styled-components";
import {
  subheadingBoldTypography,
  subheadingSemiboldTypography
} from "../../../common/App/typographies";
import {
  SORTING_ORDER,
  SortingOrderIconContainerProps
} from "../../../common/SortingSelector/types";
import { TableBodyCellCellProps, TableCellContentProps } from "./types";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding-bottom: 4px;
`;

export const TableHeaderCell = styled.th`
  height: 70;
`;

export const TableCellContent = styled.div<TableCellContentProps>`
  display: flex;
  padding: 16px;
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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const TableHeaderCellContent = styled(TableCellContent)`
  ${subheadingSemiboldTypography}
  font-weight: 400;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  cursor: pointer;
`;

export const TableBodyRow = styled.tr`
  ${subheadingBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 68px;
  border-spacing: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  }
`;

export const TableBodyCell = styled.td<TableBodyCellCellProps>`
  height: 68px;
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

export const SortingOrderIconContainer = styled.div<SortingOrderIconContainerProps>`
  display: flex;
  transform: scaleY(
    ${({ $sortingOrder }) => ($sortingOrder === SORTING_ORDER.DESC ? -1 : 1)}
  );
`;

export const LinkChevron = styled.div`
  display: none;
`;

export const IssuesLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-width: 103px;

  &:hover {
    cursor: pointer;
  }
`;

export const SeeIssuesLink = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.link};
`;
