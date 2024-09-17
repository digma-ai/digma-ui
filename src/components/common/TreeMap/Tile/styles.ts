import styled from "styled-components";
import { hexToRgb } from "../../../../utils/hexToRgb";
import {
  ChildrenContainerProps,
  TileContainerProps,
  TitleProps
} from "./types";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const TileContainer = styled.div<TileContainerProps>`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: ${({ $severity }) => {
    switch ($severity) {
      case "Top":
        return "radial-gradient(1166.07% 138.62% at 0% 0%, #B92B2B 0%, #B95E2B 100%)";
      case "High":
        return "radial-gradient(129.2% 111.8% at 0% 0%, #B95E2B 0%, #B9A22B 100%)";
      case "Medium":
        return "radial-gradient(408.61% 111.8% at 0% 0%, #B9A22B 0%, #6AB92B 100%)";
      case "Low":
      default:
        return "radial-gradient(408.61% 111.8% at 0% 0%, #6AB92B 0%, #2BB997 100%)";
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  box-sizing: border-box;
`;

export const Title = styled.span<TitleProps>`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 32px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChildrenContainer = styled.div<ChildrenContainerProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => {
    const rgb = hexToRgb(theme.colors.v3.text.primary);
    return rgb
      ? `rgba(${rgb.r} ${rgb.g} ${rgb.b} / 70%)`
      : theme.colors.v3.text.primary;
  }};
  font-size: 32px;
  font-weight: 700;
`;
