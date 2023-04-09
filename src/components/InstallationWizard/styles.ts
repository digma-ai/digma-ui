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

export const Footer = styled.div`
  display: flex;
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
  height: 123px;
  width: 312px;
  border-radius: 4px;
  overflow: hidden;
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
