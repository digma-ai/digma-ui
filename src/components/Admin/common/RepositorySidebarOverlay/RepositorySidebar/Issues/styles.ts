import styled from "styled-components";
import { LAYERS } from "../../../../../common/App/styles";
import type { DrawerContainerProps } from "./types";

export const TRANSITION_DURATION = 300;
export const drawerTransitionClassName = "drawer";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(18 18 21 / 70%);
  z-index: ${LAYERS.OVERLAY};
  overflow: hidden;
`;

export const DrawerContainer = styled.div<DrawerContainerProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90%;

  ${({ $transitionClassName, $transitionDuration }) => `
    &.${$transitionClassName}-enter {
      transform: translateY(100%);
    }
    
    &.${$transitionClassName}-enter-active {
      transform: translateY(0);
      transition: transform ${$transitionDuration}ms ease-out;
    }

    &.${$transitionClassName}-exit {
      transform: translateY(0);
    }
    
    &.${$transitionClassName}-exit-active {
      transform: translateY(100%);
      transition: transform ${$transitionDuration}ms ease-out;
    }
  `}
`;
