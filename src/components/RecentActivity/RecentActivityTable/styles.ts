import styled from "styled-components";
import { getCodeFont } from "../../common/App/styles";
import { Link } from "../../common/Link";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 3px;
  font-weight: 400;
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

export const TableHead = styled.thead`
  font-size: 10px;
  height: 26px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
        return "#b9c2eb";
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const TableHeaderRow = styled.th`
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
        return "#fbfdff";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};

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
  height: 36px;
`;

export const TableBodyCell = styled.td`
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
`;

export const DurationContainer = styled.span`
  display: flex;
  align-items: center;
`;

export const InsightsContainer = styled.span`
  display: flex;
  gap: 4px;
`;

export const InsightIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
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
  margin-left: auto;
`;

export const Suffix = styled.span`
  margin-left: 2px;
  font-size: 10px;

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

export const ListHeader = styled.div`
  margin: 8px 0;
  padding-left: 12px;
  line-height: 16px;
  font-weight: 400;
  font-size: 10px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
        return "#b9c2eb";
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const List = styled.ul`
  border-radius: 12px;
  margin: 0;
  padding: 9px 0 6px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 22px;
  font-weight: 400;

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
        return "#fbfdff";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};
`;

export const ListItem = styled.li`
  position: relative;
  font-size: 12px;
  padding: 0 18px 0 12px;
  height: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
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

export const ListSuffix = styled(Suffix)`
  font-size: 12px;
`;

// postcss-styled-components-disable-next-line
export const SpanLink = styled(Link)`
  ${({ theme }) => getCodeFont(theme.codeFont)}

  font-size: 12px;
  line-height: 14px;

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
