import styled from "styled-components";
import {
  FractionProgressBarValueProps,
  LegendItemDataColorProps
} from "./types";

export const ContentContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PieChartContainer = styled.div`
  padding: 2px;
  border-radius: 50%;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
      case "dark-jetbrains":
        return "#43454a";
    }
  }};
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LegendItemDataColor = styled.div<LegendItemDataColorProps>`
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const LegendItemDataLabel = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const LegendItemDataValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 4px;
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
  text-align: start;
  font-weight: 400;
  padding-left: 4px;
  padding-bottom: 8px;
`;

export const TableBody = styled.tbody`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const TableBodyCell = styled.td`
  &:first-child {
    padding: 4px 22px 4px 4px;
    white-space: nowrap;
  }

  &:nth-child(2) {
    width: 100%;
    padding: 4px 0;
  }

  &:last-child {
    padding: 4px 4px 4px 22px;
    text-align: end;
  }
`;

export const FractionProgressBarContainer = styled.div`
  height: 8px;
  position: relative;
  border-left: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};
  border-right: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};
`;

export const FractionProgressBar = styled.div`
  height: 1px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const FractionProgressBarValue = styled.div<FractionProgressBarValueProps>`
  width: ${({ $value }) => Math.floor($value * 100)}%;
  height: 4px;
  border-radius: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#9da0a8";
    }
  }};
`;

export const DurationContainer = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
`;

export const Suffix = styled.span`
  margin-left: 2px;
`;
