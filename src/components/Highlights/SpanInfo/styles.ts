import styled, { css } from "styled-components";
import {
  bodySemiboldTypography,
  caption1RegularTypography,
  subscriptMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { CodeSnippet } from "../../common/CodeSnippet";
import {
  AnimatedButtonContainerProps,
  ExpandButtonProps,
  StatsContainerProps,
  StyledCodeSnippetProps
} from "./types";

const COLLAPSE_BTN = "71px";
const EXPAND_BTN = "65px";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Section = styled.div`
  padding: 8px;
`;

export const Header = styled(Section)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const TitleContainer = styled.div`
  ${bodySemiboldTypography}

  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const AnimatedButtonContainer = styled.div<AnimatedButtonContainerProps>`
  display: flex;
  position: relative;
  width: ${({ $isExpanded }) => ($isExpanded ? COLLAPSE_BTN : EXPAND_BTN)};
  transition: all 500ms;
  align-items: center;
`;

export const ExpandButton = styled.button<ExpandButtonProps>`
  ${subscriptMediumTypography}

  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.link};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;

  ${({ $transitionClassName, $transitionDuration }) => {
    return `
    &.${$transitionClassName}-enter {
      opacity: 0;
    }
    &.${$transitionClassName}-enter-active {
      opacity: 1;
      transition: all ${$transitionDuration}ms;
    }
    &.${$transitionClassName}-exit {
      opacity: 1;
    }
    &.${$transitionClassName}-exit-active {
      opacity: 0;
      transition: all ${$transitionDuration}ms;
    }`;
  }}
`;

export const ExpandButtonIconButtonContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.brandTertiary};
  padding: 2px;
`;

export const ContentContainer = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 8px 12px;
`;

export const StatsContainer = styled.div<StatsContainerProps>`
  display: flex;
  gap: 5px;
  flex-grow: 1;
  height: 37px;

  ${({ $transitionClassName, $transitionDuration }) => {
    return `
    &.${$transitionClassName}-enter {
      opacity: 0;
      height: 0;
    }

    &.${$transitionClassName}-enter-active {
      opacity: 1;
      height: 37px;
      transition: all ${$transitionDuration}ms;
    }
    &.${$transitionClassName}-exit {
      opacity: 1;
      height: 37px;
    }
    &.${$transitionClassName}-exit-active {
      opacity: 0;
      height: 0;
      transition: all ${$transitionDuration}ms;
    }
    &.${$transitionClassName}-exit-done {
      opacity: 0;
      height: 0;
    }
    `;
  }}
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  flex-grow: 1;
`;

export const ServicesStat = styled(Stat)`
  width: 60%;
`;

export const EnvironmentsStat = styled(Stat)`
  width: 40%;
`;

export const StatIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const StatLabel = styled.div`
  ${caption1RegularTypography}
`;

export const StatValue = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  align-items: center;
`;

export const StatValueContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const StatValueText = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledCodeSnippet = styled(CodeSnippet)<StyledCodeSnippetProps>`
  ${({ $isExpanded }) =>
    !$isExpanded
      ? css`
          & > div > code {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding: 0;
          }
        `
      : css`
          & > div > code {
            padding: 0;
          }
        `}

  transition: height 500ms;
  max-height: 140px;
  overflow: auto;
`;

export const TitleContainerSkeleton = styled(TitleContainer)`
  height: 24px;
`;

export const StatsContainerSkeleton = styled.div`
  display: flex;
  gap: 5px;
  height: 28px;
  justify-content: space-between;
`;

export const StatSkeleton = styled.div`
  width: 81px;
`;
