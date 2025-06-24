import styled from "styled-components";
import type { ContainerProps, MCPServerIconContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid rgb(255 255 255 / 10%);
  background: linear-gradient(180deg, #28292d 0%, #1a1b1e 100%),
    linear-gradient(
      180deg,
      rgb(255 255 255 / 10%) 0%,
      rgb(255 255 255 / 0%) 100%
    );
`;

export const MCPServerIconContainer = styled.div<MCPServerIconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isEditable }) => ($isEditable ? "pointer" : "default")};
`;

export const KebabMenuButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  background: none;

  &:hover,
  &:active {
    color: currentcolor;
  }
`;
