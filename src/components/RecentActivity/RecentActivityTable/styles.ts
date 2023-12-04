import styled from "styled-components";
import { grayScale } from "../../common/App/getTheme";
import { getCodeFont } from "../../common/App/styles";
import { Link } from "../../common/Link";

export const TABLE_BODY_ROW_VERTICAL_SPACING = 4; // in pixels;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
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

export const TableHead = styled.thead<{ offset: number }>`
  position: sticky;
  top: ${({ offset }) => offset - 1}px;
  z-index: 1;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
        return "#b9c2eb";
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  box-shadow: -4px 0
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f7f8fa";
        case "dark":
          return "#0f0f0f";
        case "dark-jetbrains":
          return grayScale[1200];
      }
    }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
        return "#0f0f0f";
      case "dark-jetbrains":
        return grayScale[1200];
    }
  }};
`;

export const TableHeaderCell = styled.th`
  padding: 4px 0;
  font-weight: 400;
  text-align: start;

  &:first-child {
    padding-left: 12px;
  }
`;

export const TableBody = styled.tbody`
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#393b40";
    }
  }};

  &::before {
    content: "";
    display: block;
    height: 2px;
    background: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#f7f8fa";
        case "dark":
          return "#0f0f0f";
        case "dark-jetbrains":
          return grayScale[1200];
      }
    }};
  }

  & tr:first-child td:first-child {
    border-top-left-radius: 12px;
  }

  & tr:first-child td:last-child {
    border-top-right-radius: 12px;
  }

  & tr:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }

  & tr:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }
`;

export const TableBodyRow = styled.tr`
  position: relative;
  height: ${42 + TABLE_BODY_ROW_VERTICAL_SPACING}px;

  &:not(:last-child) > td {
    border-bottom: ${TABLE_BODY_ROW_VERTICAL_SPACING}px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#f7f8fa";
          case "dark":
            return "#0f0f0f";
          case "dark-jetbrains":
            return "#2b2d30";
        }
      }};
  }
`;

export const TableBodyCell = styled.td`
  padding: 0;

  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    padding-right: 12px;
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
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

export const InsightIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;

export const TraceButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;

export const ListItem = styled.li`
  position: relative;
  font-size: 14px;
  padding: 0 12px;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

export const ListBadgeContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  left: -4px;
  margin: auto;
  height: fit-content;
`;

export const ListInsightsContainer = styled.div`
  margin-left: auto;
  margin-right: 16px;
`;

export const ListSuffix = styled(Suffix)`
  font-size: 14px;
`;

export const SpanLink = styled(Link)`
  ${({ theme }) => getCodeFont(theme.codeFont)}

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};
`;
