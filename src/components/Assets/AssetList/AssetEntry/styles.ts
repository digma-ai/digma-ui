import styled from "styled-components";
import { getInsightCriticalityColor } from "../../../../utils/getInsightCriticalityColor";
import { caption2RegularTypography } from "../../../common/App/typographies";
import { grayScale } from "../../../common/App/v2colors";
import { CopyButton } from "../../../common/v3/CopyButton";
import type { InsightIconContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledCopyButton = styled(CopyButton)`
  padding: 0;
  display: none;
`;

export const TitleRow = styled.div`
  display: flex;
  gap: 2px;
  height: 20px;
  align-items: center;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const AssetTypeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  align-items: center;
  color: #7891d0;
`;

export const Link = styled.a`
  color: #7891d0;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const IndicatorsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 2px;
  margin-left: auto;
`;

export const InsightIconContainer = styled(
  AssetTypeIconContainer
)<InsightIconContainerProps>`
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
  color: ${({ theme, $criticality }) =>
    getInsightCriticalityColor($criticality, theme)};
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 12px 16px;
  flex-wrap: wrap;
  font-size: 14px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 140px;
`;

export const StatsColumn = styled.div`
  flex-direction: column;
  display: flex;
  gap: 12px;
`;

export const ServicesContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
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

export const ServiceName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

export const ValueContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  font-size: 14px;
  font-weight: 500;
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
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const ScopeName = styled.div`
  ${caption2RegularTypography}

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${grayScale[500]};
  opacity: 0.87;
  max-width: fit-content;
`;
