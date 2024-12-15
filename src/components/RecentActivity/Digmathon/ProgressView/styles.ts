import styled, { css, keyframes } from "styled-components";
import {
  bodyMediumTypography,
  footnoteMediumTypography,
  footnoteRegularTypography,
  footnoteSemiboldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";
import type {
  FoundIssuesNumberProps,
  NewIssuesFoundMessageProps,
  UpdateProgressButtonProps
} from "./types";

export const NEW_ISSUES_FOUND_MESSAGE_TRANSITION_DURATION = 500; //in milliseconds
export const NEW_ISSUES_FOUND_MESSAGE_ANIMATION_CLASS_NAME =
  "new-issues-found-message";

export const Header = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 8px 12px;
`;

export const HeaderTitle = styled.span`
  ${footnoteMediumTypography}
`;

export const HeaderDescription = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const IssuesCounter = styled.span`
  margin-right: auto;
`;

export const FoundIssuesNumber = styled.span<FoundIssuesNumberProps>`
  ${({ theme, $isNew }) =>
    $isNew
      ? css`
          ${footnoteSemiboldTypography}

          color: ${theme.colors.v3.text.link};
        `
      : ""}
`;

export const NewIssuesFoundMessage = styled.div<NewIssuesFoundMessageProps>`
  ${footnoteSemiboldTypography}

  color: ${({ theme }) => theme.colors.v3.text.link};
  display: flex;
  align-items: center;

  ${({ $transitionClassName, $transitionDuration }) => {
    return `
    &.${$transitionClassName}-enter {
      opacity: 0;
      transform: translateX(100px);
    }
    &.${$transitionClassName}-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: all ${$transitionDuration}ms;
    }
    &.${$transitionClassName}-exit {
      opacity: 1;
      transform: translateX(0);
    }
    &.${$transitionClassName}-exit-active {
      opacity: 0;
      transform: translateX(100px);
      transition: all ${$transitionDuration}ms;
    }`;
  }}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 1;
`;

const shineAnimation = keyframes`
  0% { left: -100%; }
  25% { left: 100%; }
  100% { left: 100%; }
`;

export const UpdateProgressButtonContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

export const UpdateProgressButton = styled(Button)<UpdateProgressButtonProps>`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      100deg,
      rgb(255 255 255 / 0%) 30%,
      rgb(255 255 255 / 35%),
      rgb(255 255 255 / 0%) 70%
    );

    ${({ $isShining }) =>
      $isShining
        ? css`
            animation: ${shineAnimation} 3s infinite linear;
          `
        : ""};
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-gap: 8px 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 0 12px 12px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const EmptyStateContentContainer = styled.div`
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const EmptyStateTextContainer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const EmptyStateTitle = styled.span`
  ${bodyMediumTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
