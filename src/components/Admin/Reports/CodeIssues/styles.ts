import styled from "styled-components";
import type { IssuesSidebarContainerProps, OverlayProps } from "./types";

export const TRANSITION_DURATION = 300;
export const overlayTransitionClassName = "overlay";
export const sidebarContainerTransitionClassName = "sidebarContainer";

export const Container = styled.div`
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
`;

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  inset: 0;
  background: #000;
  opacity: ${({ $isVisible }) => ($isVisible ? 0.6 : 0)};

  ${({ $transitionClassName, $transitionDuration }) => `
    &.${$transitionClassName}-enter {
      opacity: 0;
    }
    
    &.${$transitionClassName}-enter-active {
      opacity: 0.6;
      transition: opacity ${$transitionDuration}ms ease-out;
    }

    &.${$transitionClassName}-exit {
      opacity: 0.6;
    }
    
    &.${$transitionClassName}-exit-active {
      opacity: 0;
      transition: opacity ${$transitionDuration}ms ease-out;
    }
  `}
`;

export const IssuesSidebarContainer = styled.div<IssuesSidebarContainerProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  ${({ $transitionClassName, $transitionDuration }) => `
    &.${$transitionClassName}-enter {
      transform: translateX(100%);
    }
    
    &.${$transitionClassName}-enter-active {
      transform: translateX(0);
      transition: transform ${$transitionDuration}ms ease-out;
    }

    &.${$transitionClassName}-exit {
      transform: translateX(0);
    }
    
    &.${$transitionClassName}-exit-active {
      transform: translateX(100%);
      transition: transform ${$transitionDuration}ms ease-out;
    }
  `}
`;

export const ResizeHandle = styled.div`
  width: 16px;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};

  &:hover {
    color: ${({ theme }) => theme.colors.v3.icon.secondary};
  }
`;
