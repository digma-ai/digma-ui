import styled from "styled-components";
import {
  bodySemiboldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 16px 12px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 6px;
  justify-content: space-between;
  width: 240px;
  background: ${({ theme }) => theme.colors.v3.status.backgroundHigh};

  ${({ $transitionClassName, $transitionDuration }) => {
    return `
    &.${$transitionClassName}-enter {
      transform: translateX(-100%);
    }
    &.${$transitionClassName}-enter-active {
      transform: translateX(0);
      transition:all ${$transitionDuration}ms ease;
    }
    &.${$transitionClassName}-exit {
      transform: translateX(0);
    }
    &.${$transitionClassName}-exit-active {
      transform: translateX(100%);
      transition:all ${$transitionDuration}ms ease;
    }`;
  }}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.div`
  ${bodySemiboldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Description = styled.div`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const CrossButton = styled(Button)`
  padding: 0;
`;

export const ErrorIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.white};
`;
