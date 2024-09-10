import styled, { keyframes } from "styled-components";
import {
  bodySemiboldTypography,
  caption2BoldTypography,
  subheadingSemiboldTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  width: fit-content;
  display: flex;
  gap: 4px;
  padding: 3px 8px 3px 6px;
  border-radius: 100px;
  align-items: center;
  background: ${({ theme }) =>
    `linear-gradient(0deg, ${theme.colors.v3.surface.primary} 0%, ${theme.colors.v3.surface.primary} 100%), ${theme.colors.v3.status.backgroundSuccess}`};
`;

export const Text = styled.span`
  ${caption2BoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};
`;

export const Description = styled.span`
  ${subheadingSemiboldTypography}

  display:flex;
  flex-direction: column;
  width: 167px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
export const PromoText = styled.span`
  ${bodySemiboldTypography}
`;

export const PromoTextBold = styled.span`
  ${bodySemiboldTypography};
  color: ${({ theme }) => theme.colors.v3.text.link};
`;

const blurAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const AnimatedPromotionBackground = styled.div`
  position: absolute;
  top: 0;
  animation: 1s ${blurAnimation} linear infinite alternate;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
`;

export const Right = styled(Background)`
  right: 0;
  overflow: hidden;
`;

export const Centered = styled(Background)`
  right: 50%;
  position: absolute;
  overflow: hidden;
`;
