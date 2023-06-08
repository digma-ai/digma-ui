import styled from "styled-components";
import { Button } from "../common/Button";
import { Link as CommonLink } from "../common/Link";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  padding: 8px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;

export const HeaderTitle = styled.span`
  padding-right: 8px;
`;

export const HeaderSubtitle = styled.span`
  padding-left: 8px;
  border-left: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#fbfdff";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const Link = styled(CommonLink)`
  font-size: 12px;
  line-height: 14px;
`;

export const FooterSlackLink = styled(Link)`
  margin: 0 auto;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  padding: 12px;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};
`;

export const FooterContent = styled.div<{
  transitionClassName: string;
  transitionDuration: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;

  ${({ transitionClassName, transitionDuration }) => {
    return `
      &.${transitionClassName}-enter {
        opacity: 0;
      }
      
      &.${transitionClassName}-enter-active {
        opacity: 1;
        transition: opacity ${transitionDuration}ms ease-out;
      }
      `;
  }}
`;

export const SectionDescription = styled.span`
  font-size: 12px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const IllustrationContainer = styled.div`
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#dfe6f0";
      case "dark":
      case "dark-jetbrains":
        return "#313131";
    }
  }};
`;

export const MainButton = styled(Button)`
  padding: 4px;
  font-size: 12px;
  line-height: 14px;
  width: 100%;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  margin-bottom: auto;
`;

export const WelcomeTitleContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const WelcomeIconContainer = styled.div`
  height: 40px;
`;

export const WelcomeTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;

export const WelcomeText = styled.span`
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: -0.1px;
  padding: 20px 0;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const InstallationTypeText = styled.span`
  font-size: 12px;
  line-height: 14px;
  padding-bottom: 4px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const InstallationTypeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Badge = styled.span`
  color: #fff;
  font-weight: 400;
  border-radius: 4px;
  padding: 2px 4px;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#4b5fab";
    }
  }};
`;
