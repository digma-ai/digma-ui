import styled from "styled-components";
import { IconButton } from "../IconButton";
import { OutlineProps } from "./types";

export const Outline = styled.div<OutlineProps>`
  border-radius: 5px;
  border: ${({ $isVisible }) => ($isVisible ? "1px solid #4e2698" : "none")};
`;

export const CodeButton = styled(IconButton)`
  height: 28px;
  width: 28px;

  &:not([disabled]) {
    border: none;
  }
`;
