import styled from "styled-components";
import { ImpactScoreIndicatorProps } from "./types";

export const Container = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#c6c6c6";
    }
  }};
`;

export const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 4px;
`;

export const Indicator = styled.div<ImpactScoreIndicatorProps>`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: hsl(14deg 66% ${({ $score }) => 100 - 50 * $score}%);
`;
