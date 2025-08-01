import { Handle } from "@xyflow/react";
import styled, { css } from "styled-components";
import { subheading1RegularTypography } from "../../../../common/App/typographies";
import { PulsatingDot } from "../../PulsatingDot";
import type { ContainerProps } from "./types";

export const Node = styled.div<ContainerProps>`
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: ${({ $orientation }) =>
    $orientation === "vertical" ? "column" : "row"};
  height: ${({ $orientation }) => ($orientation === "vertical" ? 130 : 67)}px;
  width: ${({ $orientation }) => ($orientation === "vertical" ? 66 : 175)}px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive
        ? theme.colors.v3.stroke.brandPrimary
        : "rgb(255 255 255 / 10%)"};
  background: ${({ $isActive, $isDisabled }) =>
    $isDisabled
      ? "none"
      : $isActive
        ? "linear-gradient(180deg, #34384C 0%, #1E2026 100%)"
        : "linear-gradient(180deg, #28292D 0%, #1A1B1E 100%), linear-gradient(180deg, rgb(255 255  255 / 10%) 0%, rgb(255 255 255 / 0%) 100%)"};
  ${({ $isInteractive }) =>
    $isInteractive
      ? ""
      : css`
          cursor: default;
        `};
  position: relative;
`;

export const Label = styled.span<ContainerProps>`
  ${subheading1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.white};

  ${({ $orientation }) =>
    $orientation === "vertical"
      ? css`
          writing-mode: vertical-rl;
          text-orientation: sideways;
        `
      : ""};
`;

export const StyledPulsatingDot = styled(PulsatingDot)`
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.v3.surface.brandPrimary};
`;

export const IconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const InputHandle = styled(Handle)`
  height: 24px;
  width: 24px;
  ${/* TODO: change to color from the theme */ ""}
  background: #3e404a;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.icon.primary};
`;

export const OutputHandle = styled(Handle)`
  width: 6px;
  height: 6px;
  border: none;
  border-radius: 0%;
  ${/* TODO: change to color from the theme */ ""}
  background: #3e404a;
`;

export const KebabMenuButton = styled.button`
  position: absolute;
  top: -12px;
  right: -12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  border-radius: 50%;
  ${/* TODO: change to color from the theme */ ""}
  background: #3e404a;

  &:hover,
  &:active {
    color: currentcolor;
  }
`;
