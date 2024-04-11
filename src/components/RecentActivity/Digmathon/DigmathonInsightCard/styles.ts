import styled from "styled-components";
import {
  bodyBoldTypography,
  caption1BoldTypography,
  footnoteRegularTypography
} from "../../../common/App/typographies";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 8px;
  padding-top: 16px;
  padding-left: 16px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.35)};
  border-radius: 8px;
  border: 2px solid
    ${({ theme, $isActive }) =>
      $isActive
        ? theme.colors.v3.icon.brandSecondary
        : theme.colors.stroke.primary};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.v3.surface.brandPrimary : "none"};
  height: 114px;
  min-width: 191px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

export const NumberContainer = styled.div`
  ${caption1BoldTypography}

  display: flex;
  height: 16px;
  width: 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  border-radius: 50%;
  flex-shrink: 0;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  width: 143px;
  flex-shrink: 0;
`;

export const Title = styled.span`
  ${bodyBoldTypography}
`;

export const Description = styled.span`
  ${footnoteRegularTypography}
`;

export const IllustrationContainer = styled.div`
  min-width: 300px;
  overflow: hidden;
  margin-left: auto;
  z-index: 1;
`;

export const GradientBackground = styled.div`
  width: 326px;
  height: 326px;
  border-radius: 326px;
  opacity: 0.35;
  background: ${({ theme }) => theme.colors.v3.icon.primary};
  filter: blur(67px);
  position: absolute;
  right: -220px;
  bottom: -168px;
`;
