import styled from "styled-components";
import { ContainerProps } from "./types";

const BORDER_RADIUS = 8; // in pixels

export const BorderContainer = styled.div<ContainerProps>`
  padding: 1px;
  border-radius: ${BORDER_RADIUS}px;
  display: inline-block;
  margin-right: 4px;
  cursor: pointer;
  position: relative;

  ${({ isSelected, theme }) => {
    if (!isSelected) {
      return "";
    }

    switch (theme.mode) {
      case "light":
        return `
          background: linear-gradient(125.97deg, #d5e4ff 17.33%, #e4eeff 85.67%);
          box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.07);
        `;
      case "dark":
        return `
          background: linear-gradient(109.83deg, #3a3d41 0.01%, rgba(0, 0, 0, 0) 102.21%);
          box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
      `;
    }
  }}
`;

export const Container = styled.button<ContainerProps>`
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 12px;

  color: ${({ isSelected, theme }) => {
    if (isSelected) {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
          return "#b9c2eb";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
        return "#7c7c94";
    }
  }};

  border-radius: ${BORDER_RADIUS}px;
  height: 26px;
  border: none;
  background: ${({ isSelected, theme }) => {
    if (!isSelected) {
      return "none";
    }

    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
        return "#1e1e1e";
    }
  }};
  cursor: inherit;

  &:hover {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
          return "#b9c2eb";
      }
    }};
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
`;
