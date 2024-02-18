import styled, { css, keyframes } from "styled-components";
import { IconButton as CommonIconButton } from "../IconButton";
import { ExtendedIconButtonProps, OutlineProps } from "./types";

const rotateBackgroundAnimation = keyframes`
  from {
    background-position: 0% 50%; 
  }

  to {
    background-position: 100% 50%; 
  }
`;

const pulseBoxShadowAnimation = keyframes`
  from {
    background: ${({ theme }) => theme.colors.v3.surface.primary};
    box-shadow: none;
  }

  to {
    background: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
    box-shadow: 1px 1px 4px 0 rgb(0 0 0 /25%), 0 0 9.1px 0 rgb(96 99 246 / 30%);
  }
`;

export const OutlineBackground = styled.div<OutlineProps>`
  width: 32px;
  height: 32px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 /25%), 0 0 9.1px 0 rgb(96 99 246 / 30%);
  ${({ $isAnimated }) =>
    $isAnimated
      ? css`
          background: ${({ theme }) => theme.colors.v3.surface.primary};
          box-shadow: none;
          animation: ${pulseBoxShadowAnimation} 0.8s ease-in-out alternate
            infinite;
        `
      : css`
          animation: none;
        `};
`;

export const Outline = styled.div<OutlineProps>`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${"" /* TODO: improve gradient colors and animation */}
  background-image: linear-gradient(135deg, rgb(78 38 152 / 50%), #7e80e8);

  ${({ $isAnimated }) =>
    $isAnimated
      ? css`
          background-size: 400% 400%;
          animation: ${rotateBackgroundAnimation} 0.8s ease-in-out alternate
            infinite;
        `
      : css`
          background-size: 100% 100%;
          animation: none;
        `};
`;

export const CodeButton = styled(CommonIconButton)`
  &:enabled,
  &:hover:enabled,
  &:active:enabled {
    border: none;
    height: 30px;
    width: 30px;
  }
`;

export const ExtendedIconButton = styled(
  CommonIconButton
)<ExtendedIconButtonProps>`
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.v3.icon.brandTertiary
      : theme.colors.v3.surface.primary};
  background: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.v3.surface.brandDark
      : theme.colors.v3.surface.primary};
`;
