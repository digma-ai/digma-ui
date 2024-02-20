import styled, { css } from "styled-components";
import { IconButton } from "../../common/IconButton";
import { BorderContainerProps } from "./types";

export const BorderContainer = styled.div<BorderContainerProps>`
  height: 32px;
  width: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $type }) => {
    if ($type === "error") {
      return css`
        box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%),
          0 0 9.1px 0 rgb(218 45 95 / 30%);
        background-image: linear-gradient(135deg, #3d2327, #da2d5f);
      `;
    }

    return css`
      box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%),
        0 0 9.1px 0 rgb(96 99 246 / 30%);
      background-image: linear-gradient(135deg, rgb(123 83 178 / 50%), #6568cf);
    `;
  }}
`;

export const BorderlessIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.v3.icon.secondary};

  &:enabled,
  &:hover:enabled,
  &:active:enabled {
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
`;
