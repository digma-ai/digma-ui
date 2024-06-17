import styled, { css } from "styled-components";
import { Overlay } from "../common/Overlay";
import { RegistrationCard } from "./RegistrationCard";
import { AnimatedRegistrationCardProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const ContentContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

export const StyledOverlay = styled(Overlay)<{ $isVisible: boolean }>`
  overflow: hidden;
  padding: 0;
  ${({ $isVisible }) =>
    $isVisible
      ? ""
      : css`
          display: none;
        `}
`;

export const AnimatedRegistrationCard = styled(
  RegistrationCard
)<AnimatedRegistrationCardProps>`
  ${({ $transitionClassName, $transitionDuration }) => {
    return `
    &.${$transitionClassName}-enter {
      transform: translateY(100%);
    }

    &.${$transitionClassName}-enter-active {
      transform: translateY(0);
      transition:all ${$transitionDuration}ms ease;
    }
    &.${$transitionClassName}-exit {
      transform: translateY(0);
    }
    &.${$transitionClassName}-exit-active {
      transform: translateY(100%);
      transition:all ${$transitionDuration}ms ease;
    }`;
  }};
`;

export const CardContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const CustomOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: black;
  opacity: 0.5;
`;
