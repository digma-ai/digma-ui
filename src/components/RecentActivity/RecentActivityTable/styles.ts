import styled from "styled-components";
import { Link } from "../../common/Link";
import { CopyButton } from "../../common/v3/CopyButton";
import { ListItemProps, TableBodyRowProps, TableHeadProps } from "./types";

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
        return "#dadada";
      case "dark-jetbrains":
        return "#c6c6c6";
    }
  }};
`;

export const TableHead = styled.div<TableHeadProps>`
  position: sticky;
  display: flex;
  top: ${({ $offset }) => $offset - 1}px;
  z-index: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.recentActivity.table.header.text};
  box-shadow: -4px 0 ${({ theme }) => theme.colors.recentActivity.background};
  background: ${({ theme }) => theme.colors.recentActivity.background};
  padding-bottom: 8px;
`;

export const TableHeadRow = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const TableHeaderCell = styled.div`
  text-align: start;
  overflow: hidden;

  &:first-child {
    padding-left: 8px;
  }

  &:last-child {
    padding-right: 8px;
  }
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableBodyRow = styled.div<TableBodyRowProps>`
  display: flex;
  position: relative;
  height: 36px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, $isRecent }) =>
      $isRecent
        ? theme.colors.recentActivity.table.row.new.border
        : theme.colors.recentActivity.table.row.default.border};
  gap: 20px;
  background: ${({ theme, $isRecent }) =>
    $isRecent
      ? theme.colors.recentActivity.table.row.new.background
      : theme.colors.recentActivity.table.row.default.background};
  box-sizing: border-box;
`;

export const TableBodyCell = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;

  &:first-child {
    padding-left: 8px;
  }

  &:last-child {
    padding-right: 8px;
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  margin: auto;
  left: -4px;
`;

export const TimeDistanceContainer = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const DurationContainer = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const InsightsContainer = styled.span`
  display: flex;
  gap: 4px;
`;

export const TraceButtonContainer = styled.div`
  display: flex;
`;

export const Suffix = styled.span`
  margin-left: 2px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
        return "#7c7c94";
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  border-radius: 12px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
        return "#dadada";
      case "dark-jetbrains":
        return "#c6c6c6";
    }
  }};
  border: 1px solid
    ${({ theme }) => theme.colors.recentActivity.table.row.default.border};
`;

export const ListItem = styled.li<ListItemProps>`
  position: relative;
  font-size: 14px;
  padding: 0 12px;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  background: ${({ theme, $isRecent }) =>
    $isRecent
      ? theme.colors.recentActivity.table.row.new.background
      : theme.colors.recentActivity.table.row.default.background};

  &:first-child {
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
  }

  &:last-child {
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
  }
`;

export const ListInsightsContainer = styled.div`
  margin-left: auto;
  margin-right: 16px;
`;

export const ListSuffix = styled(Suffix)`
  font-size: 14px;
`;

export const SpanLinksContainer = styled.span`
  overflow: hidden;
  display: flex;
  gap: 4px;
`;

export const StyledCopyButton = styled(CopyButton)`
  padding: 0 6px;
  display: none;
`;

export const SpanLinkContainer = styled.span`
  display: flex;
  align-items: center;
  overflow: hidden;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const SpanLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.recentActivity.table.row.default.link};
`;
