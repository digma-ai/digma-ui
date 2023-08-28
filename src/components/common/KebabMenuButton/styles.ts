import styled from "styled-components";
import { KebabMenuButtonProps } from "./types";

export const Container = styled.div<KebabMenuButtonProps>`
  width: 12px;
  height: 12px;
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }
`;
