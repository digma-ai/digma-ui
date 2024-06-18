import styled, { css } from "styled-components";
import {
  bodyMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Overlay } from "../../common/Overlay";
import { RegisterForm } from "../../common/RegisterForm";
import { Button } from "../../common/v3/Button";
import { Link } from "../../common/v3/Link";
import { AnimatedRegistrationCardProps, CustomOverlayProps } from "./types";

export const Container = styled.div<AnimatedRegistrationCardProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  border-radius: 12px 12px 0 0;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  position: absolute;
  bottom: 0;
  max-height: 100%;
  overflow: auto;

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

export const CrossButton = styled(Button)`
  padding: 0;
  position: absolute;
  top: 16px;
  right: 9px;
`;

export const Description = styled.div`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
  text-align: center;
`;

export const FormContainer = styled.div`
  max-width: 308px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const Register = styled(RegisterForm)`
  flex-direction: column;

  form {
    gap: 2px;
  }
`;

export const SlackLink = styled(Link)`
  ${bodyMediumTypography}
  display: flex;
  align-items: center;
  gap: 4px;
  height: 60px;
  text-decoration: underline;
`;

export const CustomOverlay = styled(Overlay)<CustomOverlayProps>`
  overflow: hidden;
  padding: 0;
  ${({ $isVisible }) =>
    $isVisible
      ? ""
      : css`
          display: none;
        `}
`;
