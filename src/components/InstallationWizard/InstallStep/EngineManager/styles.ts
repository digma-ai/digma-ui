import styled, { css } from "styled-components";
import { Button } from "../../../common/Button";
import type { ContentContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 445px;
  text-align: center;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;

  ${({ $overlay }) => {
    if ($overlay) {
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
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
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
  gap: 8px;
`;

export const MainButton = styled(Button)`
  font-size: 16px;
  padding: 6px 12px;
  height: initial;
  background: #3538cd;

  & > span {
    gap: 2px;
  }
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  color: #fff;
  background: #4e5157;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  margin: 0;
  border-radius: 2px;
  border: none;
  font-family: inherit;
  font-weight: 500;
`;
