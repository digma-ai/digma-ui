import styled from "styled-components";
import { Link as CommonLink } from "../../../../common/Link";
import type { ContainerProps, CountChipProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 2px;
  border: 1px solid #434343;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 12%);
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#23282f";
    }
  }};
  ${({ $isDisabled }) => ($isDisabled ? "opacity: 0.6;" : "")}
`;

export const Header = styled.div`
  font-size: 14px;
  font-weight: 600;
  min-height: 22px;
  text-transform: capitalize;
  display: flex;
  gap: 8px;
  align-items: center;
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

export const StatusContainer = styled.div`
  padding-top: 4px;
  margin-top: auto;
  height: 21px;
`;

export const Chip = styled.div`
  border-radius: 21px;
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export const CountChip = styled(Chip)<CountChipProps>`
  color: ${({ theme, $count }) => {
    switch (theme.mode) {
      case "light":
        return $count > 0 ? "#1dc693" : "#e00036";
      case "dark":
      case "dark-jetbrains":
        return $count > 0 ? "#67d28b" : "#f93967";
    }
  }};
  background: ${({ theme, $count }) => {
    switch (theme.mode) {
      case "light":
        return `rgb(${$count > 0 ? "29 198 147" : "224 0 54"} / 30%)`;
      case "dark":
      case "dark-jetbrains":
        return `rgb(${$count > 0 ? "103 210 139" : "249 57 103"} / 30%)`;
    }
  }};
`;

export const NoDataChip = styled(Chip)`
  color: #e2e7ff;
  background: #6b6dda;
`;

export const NoDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #9b9b9b;
  font-weight: 500;
  font-size: 14px;
`;

export const Link = styled(CommonLink)`
  color: inherit;
`;
