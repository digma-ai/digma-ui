import styled, { css } from "styled-components";
import { Button } from "../../../common/Button";
import { ContentContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 8px 0;
  text-align: center;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;

  ${({ overlay }) => {
    if (overlay) {
      return css`
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${({ theme }) => {
            switch (theme.mode) {
              case "light":
                return "#ebecf0";
              case "dark":
              case "dark-jetbrains":
                return "#393b40";
            }
          }};
          opacity: 0.5;
          pointer-events: none;
        }
      `;
    }
  }};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const ErrorMessage = styled.span`
  word-break: break-word;
  max-width: 300px;
  white-space: pre-line;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonDivider = styled.div`
  height: 22px;
  width: 1px;
  margin: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
      case "dark-jetbrains":
        return "#49494d";
    }
  }};
`;

export const MainButton = styled(Button)`
  font-size: 16px;
  width: 142px;
  height: 25px;
`;
