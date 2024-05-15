import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { CopyButton } from "../../../common/v3/CopyButton";
import { ImpactScoreIndicatorProps } from "./types";

export const Container = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
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
  gap: 4px;
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
  width: 24px;
  height: 24px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.link};
`;

export const Link = styled.a`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.link};
  text-decoration: none;
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

export const InsightIconContainer = styled(AssetTypeIconContainer)`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 8px 16px;
  flex-wrap: wrap;
  font-size: 14px;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const ServiceName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const StatValue = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  align-items: flex-end;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Suffix = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const ImpactScoreIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 4px;
`;

export const ImpactScoreIndicator = styled.div<ImpactScoreIndicatorProps>`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: hsl(14deg 66% ${({ $score }) => 100 - 50 * $score}%);
`;

export const ScopeName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  max-width: fit-content;
`;
