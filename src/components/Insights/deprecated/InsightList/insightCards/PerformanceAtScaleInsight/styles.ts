import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 3px;
  font-weight: 500;
  border-radius: 4px;
  padding: 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#303031";
    }
  }};
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9da0a8";
    }
  }};
`;

export const TableHeaderCell = styled.th`
  font-weight: 400;
  text-align: center;
  padding: 0;

  &:last-child {
    text-align: end;
  }
`;

export const TableBodyRow = styled.tr`
  height: 25px;
`;

export const TableBodyCell = styled.td`
  text-align: center;
  padding: 0;

  &:first-child {
    text-align: start;
  }

  &:last-child {
    text-align: end;
  }
`;

export const DurationContainer = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#c6c6c6";
    }
  }};
`;

export const Suffix = styled.span`
  margin-left: 2px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9da0a8";
    }
  }};
`;
