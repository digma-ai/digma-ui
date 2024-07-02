import styled from "styled-components";
import { isNumber } from "../../../../typeGuards/isNumber";
import { getInsightCriticalityColor } from "../../../../utils/getInsightCriticalityColor";
import { IconContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding: 4px;
  overflow: hidden;
`;

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  color: ${({ theme, $criticality }) =>
    isNumber($criticality)
      ? getInsightCriticalityColor($criticality, theme)
      : theme.colors.v3.icon.disabled};
`;

export const Name = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
