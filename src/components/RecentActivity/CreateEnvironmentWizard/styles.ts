import styled from "styled-components";
import type { StepProps } from "./types";

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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

export const StepBackground = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
