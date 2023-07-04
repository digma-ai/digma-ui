import styled from "styled-components";
import { PercentileViewModeOptionProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border-radius: 4px;

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
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const InsightIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 2px;
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

export const Toolbar = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Stats = styled.span`
  font-size: 10px;
  line-height: normal;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const ExpandButton = styled.button`
  padding: 0;
  border: none;
  background: none;
`;

export const ContentContainer = styled.div`
  font-size: 10px;
  line-height: normal;
`;

export const ButtonsContainer = styled.div`
  margin-top: auto;
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const PercentileViewModeToggle = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 4px;
  gap: 4px;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;

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
`;

export const PercentileViewModeToggleOption = styled.div<PercentileViewModeOptionProps>`
  border-radius: 4px;
  padding: 2px 4px;
  cursor: pointer;
  user-select: none;

  color: ${({ theme, selected }) => {
    if (selected) {
      return "#e2e7ff";
    }

    switch (theme.mode) {
      case "light":
        return "#3538cd";
      case "dark":
      case "dark-jetbrains":
        return "#e2e7ff";
    }
  }};

  background: ${({ selected }) => (selected ? "#3538cd" : "transparent")};
`;
