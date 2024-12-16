/* eslint-disable react/jsx-curly-brace-presence */
// Source: https://www.benmvp.com/blog/how-to-create-circle-svg-gradient-loading-spinner/
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { DEFAULT_ICON_SIZE } from "../icons/hooks";
import type { NewCircleLoaderProps } from "./types";

const getDefaultColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#5154ec";
    case "dark":
    case "dark-jetbrains":
      return "#7891d0";
  }
};

export const NewCircleLoader = ({
  size = DEFAULT_ICON_SIZE,
  color
}: NewCircleLoaderProps) => {
  const theme = useTheme();
  const loaderColor = color ?? getDefaultColor(theme);

  const VIEWPORT_SIZE = 200;
  const EXTRA_PATH = 2; // for the round end cap
  const centerY = VIEWPORT_SIZE / 2;
  const r = VIEWPORT_SIZE / 2;
  const strokeWidth = VIEWPORT_SIZE * 0.0835;
  const halfStrokeWidth = strokeWidth - 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWPORT_SIZE} ${VIEWPORT_SIZE}`}
      fill="none"
      color={loaderColor}
    >
      <defs>
        <linearGradient id="circle-loader-upperHalf">
          <stop offset="0%" stopOpacity="0.5" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="circle-loader-bottomHalf">
          <stop offset="0%" stopOpacity="0.5" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0" stopColor="currentColor" />
        </linearGradient>
      </defs>

      <g strokeWidth={strokeWidth}>
        <path
          stroke="url(#circle-loader-upperHalf)"
          d={`M ${halfStrokeWidth} ${centerY} A ${r - halfStrokeWidth} ${
            r - halfStrokeWidth
          } 0 0 1 ${2 * r - halfStrokeWidth} ${centerY}`}
        />
        <path
          stroke="url(#circle-loader-bottomHalf)"
          d={`M ${2 * r - halfStrokeWidth} ${centerY} A ${
            r - halfStrokeWidth
          } ${r - halfStrokeWidth} 0 0 1 ${halfStrokeWidth} ${centerY}`}
        />
        {/* 1deg extra path to have the round end cap */}
        <path
          stroke="currentColor"
          strokeLinecap="round"
          d={`M ${2 * r - halfStrokeWidth} ${centerY} A ${
            r - halfStrokeWidth
          } ${r - halfStrokeWidth} 0 0 1 ${2 * r - halfStrokeWidth} ${
            centerY - EXTRA_PATH
          }`}
        />
      </g>
      <animateTransform
        from="0 0 0"
        to="360 0 0"
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1000ms"
      />
    </svg>
  );
};
