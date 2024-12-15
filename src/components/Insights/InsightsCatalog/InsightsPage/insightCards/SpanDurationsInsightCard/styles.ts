import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../common/App/typographies";
import { KeyValue } from "../common/InsightCard/KeyValue";
import type { ChartContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DescriptionColumn = styled(KeyValue)`
  flex-grow: 2;
`;

export const ChartContainer = styled.div<ChartContainerProps>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  background: ${({ theme }) => theme.colors.surface.primary};
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
`;

export const TooltipContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 15%);
  word-break: keep-all;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
`;
