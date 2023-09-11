import styled from "styled-components";
import { KebabMenuButtonProps } from "./types";

export const Container = styled.div<KebabMenuButtonProps>`
  width: 14px;
  height: 14px;
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }
`;
