import styled, { keyframes } from "styled-components";
import {
  bodySemiboldTypography,
  subheadingSemiboldTypography
} from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";

export const CollapsedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.brandPrimary};
  padding: 8px 8px 8px 12px;
  align-items: flex-start;
  border-radius: 4px;
  position: relative;
`;

export const PromoText = styled.span`
  ${bodySemiboldTypography}

  b {
    ${bodySemiboldTypography};
    color: ${({ theme }) => theme.colors.v3.text.link};
  }
`;

export const CrossButton = styled(Button)`
  padding: 0;
  position: absolute;
  right: 16px;
  top: 9px;
`;

export const ExpandedContainer = styled.div`
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  width: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DetailsContainer = styled.div`
  width: 264px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Description = styled.span`
  ${subheadingSemiboldTypography}

  width: 167px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

const shineAnimation = keyframes`
  0% { left: -33%; }
  50% {left: 33%}
  100% { left: -33%; }
`;

export const AcceptButton = styled(Button)`
  padding: 6px 8px;
  position: relative;

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
    animation: ${shineAnimation} 2s infinite linear;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`;

export const LogoBackground = styled.div`
  position: absolute;
  right: 0;
`;

export const SkipButton = styled(Button)`
  span {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }
`;

export const Holder = styled.div`
  position: relative;
  inset: 0;
  width: 100%;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
`;

export const CollapsedHolder = styled(Holder)`
  display: flex;
  justify-content: space-between;
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

const blurAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const AnimatedPromotionBackground = styled.div`
  position: absolute;
  top: 0;
  animation: 1s ${blurAnimation} linear infinite alternate;
`;
