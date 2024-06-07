import styled from "styled-components";
import { KeyValue } from "../../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/KeyValue";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  height: 100%;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 8px;

  & > * {
    flex: 1 1 0;
  }
`;

export const StyledKeyValue = styled(KeyValue)`
  gap: 4px;
  flex-shrink: 0;

  & > *:first-child {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }

  & > *:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ServicesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ServicesIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const FlowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  height: 100%;
`;

export const FlowPagination = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
`;

export const FlowsCountNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const CurrentFlowNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
