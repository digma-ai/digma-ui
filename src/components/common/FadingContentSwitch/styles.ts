import styled from "styled-components";
import { FadingContainerProps } from "./types";

export const Container = styled.div`
  position: relative;
`;

export const FadingContentContainer = styled.div<FadingContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;

  ${({ $transitionClassName, $transitionDuration }) => {
    return `
      &.${$transitionClassName}-enter {
        opacity: 0;
      }
      
      &.${$transitionClassName}-enter-active {
        opacity: 1;
        transition: opacity ${$transitionDuration}ms ease-out;
      }

      &.${$transitionClassName}-exit {
        opacity: 1;
      }
      
      &.${$transitionClassName}-exit-active {
        opacity: 0;
        transition: opacity ${$transitionDuration}ms ease-out;
      }
      `;
  }}
`;
