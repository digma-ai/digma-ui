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
    &.${$transitionClassName}-exit {
      opacity: 1;
    }
    
    &.${$transitionClassName}-exit-active {
      opacity: 0;
      transition: opacity ${$transitionDuration}ms ease-out;
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
