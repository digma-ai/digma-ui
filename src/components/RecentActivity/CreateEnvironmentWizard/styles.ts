import styled from "styled-components";
import { StepProps } from "./types";

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
`;

export const Step = styled.div<StepProps>`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  gap: 4px;
  flex-direction: column;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 16px;
`;

export const StepContainer = styled.div`
  display: flex;
  min-height: 210px;
  flex-direction: column;
  padding: 12px;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const RecentActivityContainerBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

export const RecentActivityContainerBackgroundGradient = styled.div`
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  height: 383.6%;
  width: 82.1%;
  border-radius: 100%;
  opacity: 0.7;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(79 93 163 / 60%) 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
`;

export const StepBackground = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
