import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../../../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressBarContainer = styled.div`
  position: relative;
`;

export const Background = styled.div`
  border-radius: 10px;
  opacity: 0.7;
  background: linear-gradient(90deg, #6ebd9c 0%, #da802d 50.5%, #da2d5f 100%);
  height: 4px;
  width: 100%;
`;

const CIRCLE_RADIUS = 5; // pixels

export const Circle = styled.div<{ value: number }>`
  position: absolute;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.v3.surface.primary};
  background: ${({ theme }) => theme.colors.v3.icon.primary};
  width: ${CIRCLE_RADIUS * 2}px;
  height: ${CIRCLE_RADIUS * 2}px;
  top: 0;
  bottom: 0;
  margin: auto;
  left: calc(${({ value }) => value}% - ${CIRCLE_RADIUS}px);
`;

export const Legend = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const ValueLabel = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
