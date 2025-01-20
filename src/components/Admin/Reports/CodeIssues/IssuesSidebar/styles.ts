import styled from "styled-components";
import { LAYERS } from "../../../../common/App/styles";
import {
  bodyBoldTypography,
  caption1RegularTypography
} from "../../../../common/App/typographies";
import type { DrawerContainerProps } from "./types";

export const TRANSITION_DURATION = 300;
export const drawerTransitionClassName = "drawer";

export const Container = styled.div`
  background: ${({ theme }) =>
    `linear-gradient(0deg, ${theme.colors.v3.surface.primary} 0%, ${theme.colors.v3.surface.primary} 100%), #fff`};
  display: flex;
  flex-direction: column;
  border-radius: 8px 0 0 8px;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 8px 0 8px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDarkest};
`;

export const HeaderTitleRow = styled.div`
  ${bodyBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding: 16px;
`;

export const Footer = styled.div`
  ${caption1RegularTypography}
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 8px;
  gap: 8px;
`;

export const FooterItemsCount = styled.span`
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const FooterPageItemsCount = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(18 18 21 / 70%);
  z-index: ${LAYERS.OVERLAY};
  overflow: hidden;
`;

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 16px 4%;
  overflow: hidden;
  box-sizing: border-box;
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
