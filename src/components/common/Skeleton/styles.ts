import styled, { css, keyframes } from "styled-components";
import { isNumber } from "../../../typeGuards/isNumber";
import { hexToRgb } from "../../../utils/hexToRgb";
import { SkeletonElementProps } from "./types";

const blinkingAnimation = keyframes`
from { opacity: 0.05; }
to { opacity: 0.1; }
`;

const Skeleton = styled.div<SkeletonElementProps>`
  opacity: 0.05;
  animation-name: ${blinkingAnimation};
  animation-delay: 200ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 400ms;
  ${({ theme, $gradient }) => {
    if ($gradient) {
      const rgb = hexToRgb(theme.colors.v3.icon.primary);
      const rgbString = rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : "";

      if (rgbString) {
        return css`
          background-image: linear-gradient(
            to right,
            rgb(${rgbString} / 100%),
            rgb(${rgbString} / 0%)
          );
        `;
      }
    }

    return css`
      background: ${theme.colors.v3.icon.primary};
    `;
  }}
`;

export const RectangleSkeleton = styled(Skeleton)`
  height: ${({ $height }) => (isNumber($height) ? `${$height}px` : "100%")};
  width: ${({ $width }) => (isNumber($width) ? `${$width}px` : "100%")};
  border-radius: 4px;
`;

export const CircleSkeleton = styled(Skeleton)`
  ${({ $height }) =>
    isNumber($height)
      ? css`
          width: ${$height}px;
          height: ${$height}px;
        `
      : css`
          width: 24px;
          height: 24px;
        `}
  border-radius: 50%;
`;

export const TextSkeleton = styled(Skeleton)`
  ${({ $height }) =>
    isNumber($height)
      ? css`
          height: ${$height}px;
          border-radius: ${$height / 2}px;
        `
      : css`
          height: 16px;
          border-radius: 8px;
        `}
  width: ${({ $width }) => (isNumber($width) ? `${$width}px` : "100%")};
`;
