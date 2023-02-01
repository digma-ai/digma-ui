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

  ${({ isSelected }) =>
    isSelected
      ? `
    background: linear-gradient(
      109.83deg,
      #3a3d41 0.01%,
      rgba(0, 0, 0, 0) 102.21%
    );

    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
  `
      : ``};
`;

export const Container = styled.button<ContainerProps>`
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 12px;
  color: ${({ isSelected }) => (isSelected ? "#b9C2eb" : "#7c7c94")};
  border-radius: ${BORDER_RADIUS}px;
  height: 26px;
  border: none;
  background: ${({ isSelected }) => (isSelected ? "#1e1e1e" : "none")};
  cursor: inherit;

  &:hover {
    color: #b9c2eb;
  }
`;
