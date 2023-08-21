import styled from "styled-components";
import { PercentileViewModeOptionProps } from "./types";

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
  position: relative;
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

export const BadgeContainer = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
`;

export const Toolbar = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Stats = styled.span`
  font-size: 12px;
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
  cursor: pointer;
`;

export const RefreshContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  font-size: 12px;
`;

export const AsyncBadge = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  border-radius: 4px;
  padding: 2px 4px;
  text-align: center;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#4b5fab";
    }
  }};
`;

export const PercentileViewModeToggle = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 4px;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#4e5157";
      }
    }};
`;

export const PercentileViewModeToggleOptionButton = styled.button<PercentileViewModeOptionProps>`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
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
  background: ${({ selected }) => (selected ? "#5154ec" : "transparent")};
`;
