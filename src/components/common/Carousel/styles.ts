import styled, { css } from "styled-components";
import { hexToRgb } from "../../../utils/hexToRgb";
import { NewIconButton } from "../v3/NewIconButton";
import { CarouselButtonProps } from "./types";

export const Container = styled.div`
  position: relative;
`;

export const CarouselButton = styled(NewIconButton)<CarouselButtonProps>`
  top: 0;
  position: absolute;
  border-radius: 0;
  border: none;
  height: 100%;
  min-height: 28px;
  width: 44px;

  ${({ direction, theme }) => {
    const hexColor = theme.colors.v3.surface.primary;
    const rgbColor = hexToRgb(hexColor);

    return direction === "left"
      ? css`
          padding-right: 22px;
          left: 0;
          background: ${rgbColor
            ? `linear-gradient(
            90deg,
            ${hexColor} 35%,
            rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 100%
          )`
            : "transparent"};
        `
      : css`
          padding-left: 22px;
          right: 0;
          background: ${rgbColor
            ? `linear-gradient(
            90deg,
            rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 4.55%,
            ${hexColor} 60.23%
          )`
            : "transparent"};
        `;
  }}

  &:hover:enabled {
    border: none;
    ${({ direction, theme }) => {
      const hexColor = theme.colors.v3.surface.primary;
      const rgbColor = hexToRgb(hexColor);

      return direction === "left"
        ? css`
            background: ${rgbColor
              ? `linear-gradient(
            90deg,
            ${hexColor} 35%,
            rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 100%
          )`
              : "transparent"};
          `
        : css`
            background: ${rgbColor
              ? `linear-gradient(
            90deg,
            rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 4.55%,
            ${hexColor} 60.23%
          )`
              : "transparent"};
          `;
    }}
  }
`;
