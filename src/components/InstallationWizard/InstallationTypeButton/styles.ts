import styled from "styled-components";
import { InstallationTypeButtonElementProps } from "./types";

export const InstallationTypeButton = styled.button`
  display: flex;
  padding: 12px;
  gap: 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 14px;
  border: 1px solid transparent;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};

  &:hover {
    border: 1px solid
      ${({ theme, disabled }) => {
        if (disabled) {
          return "transparent";
        }

        switch (theme.mode) {
          case "light":
            return "#b9c2eb";
          case "dark":
          case "dark-jetbrains":
            return "#49494d";
        }
      }};
  }

  &:active {
    border: 1px solid
      ${({ theme, disabled }) => {
        if (disabled) {
          return "transparent";
        }

        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#7c7c94";
        }
      }};
  }

  &:disabled {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#9b9b9b";
      }
    }};
  }
`;

export const InstallationTypeButtonIconContainer = styled.span<InstallationTypeButtonElementProps>`
  display: flex;
  flex-shrink: 0;
  height: 72px;
  width: 72px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#3c3c3c";
    }
  }};

  ${({ disabled }) => (disabled ? "opacity: 0.5;" : "")}
`;

export const InstallationTypeButtonTextContainer = styled.span`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const InstallationTypeButtonTitle = styled.span<InstallationTypeButtonElementProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 8px;

  color: ${({ disabled, theme }) => {
    if (disabled) {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#9b9b9b";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;
