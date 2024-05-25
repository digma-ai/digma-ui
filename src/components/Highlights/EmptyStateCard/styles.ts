import styled, { css } from "styled-components";
import {
  subscriptMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Card as CommonCard } from "../../common/v3/Card";
import { CardProps, IconContainerProps } from "./types";

const MIN_HEIGHT = 140; // in pixels

export const Container = styled.div`
  position: relative;
  min-height: ${MIN_HEIGHT}px;
`;

export const BlurredContent = styled.div`
  position: absolute;
`;

export const Card = styled(CommonCard)<CardProps>`
  box-sizing: border-box;
  height: ${({ $height, $blurredBackground }) =>
    $blurredBackground ? $height : MIN_HEIGHT}px;
  position: absolute;
  width: 100%;

  ${({ $blurredBackground }) =>
    $blurredBackground
      ? css`
          background: none;
          backdrop-filter: blur(4px);
        `
      : ""};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  height: 100%;
`;

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};

  ${({ $type, theme }) => {
    switch ($type) {
      case "success":
        return `
          background: ${theme.colors.v3.status.backgroundSuccess};
          color: ${theme.colors.v3.status.success};
        `;
      case "lowSeverity":
        return `
          background: ${theme.colors.v3.status.backgroundLow};
          color: ${theme.colors.v3.status.low};
        `;
      case "default":
      default:
        return `
          background: ${theme.colors.v3.surface.primaryLight};
          color: ${theme.colors.v3.text.tertiary};
        `;
    }
  }}
`;

export const TextContainer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Title = styled.span`
  ${subscriptMediumTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
