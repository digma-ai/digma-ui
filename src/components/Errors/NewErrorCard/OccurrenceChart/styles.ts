import styled from "styled-components";
import { bodySemiboldTypography } from "../../../common/App/typographies";
import { Tooltip } from "../../../common/v3/Tooltip/styles";

export const HEIGHT = 208; // in pixels

export const HistogramContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  height: ${HEIGHT}px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  padding: 12px 0 12px 12px;
  border-radius: 4px;
`;

export const HistogramHeader = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
`;

export const HistogramTitle = styled.span`
  ${bodySemiboldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const TooltipContainer = styled(Tooltip)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`;
