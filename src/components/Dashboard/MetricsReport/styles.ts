import styled from "styled-components";
import { bodyRegularTypography } from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const ContainerBackground = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const ContainerBackgroundGradient = styled.div`
  z-index: -1;
  position: absolute;
  margin: auto;
  right: -24%;
  bottom: -117%;
  height: 160%;
  width: 146%;
  border-radius: 100%;
  opacity: 0.7;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(79 93 163 / 60%) 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 24px 24px 16px;
  gap: 24px;
  box-sizing: border-box;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  gap: 8px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.v3.text.disabled};
  ${bodyRegularTypography}
`;
