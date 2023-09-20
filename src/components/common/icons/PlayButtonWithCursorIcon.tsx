import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const PlayButtonWithCursorIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 101 100"
    >
      <circle cx="50.5" cy="50" r="50" fill="#323334" />
      <g filter="url(#play-button-with-cursor-filter-1)">
        <path
          fill="#6C6D72"
          d="M76.99 47.62a2.75 2.75 0 0 1 0 4.76L39.32 74.13a2.75 2.75 0 0 1-4.13-2.38v-43.5c0-2.11 2.3-3.43 4.13-2.38l37.67 21.75Z"
        />
      </g>
      <g filter="url(#play-button-with-cursor-filter-2)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m60.7 53.18 4.77 18.26 3.38-5.75 5.79 6.61s1.11.06 1.52-.4c.4-.45.73-1.24.37-1.71-1.7-2.24-5.8-6.62-5.8-6.62l5.33-1.4-15.36-8.99Z"
          clipRule="evenodd"
        />
      </g>
      <path
        stroke="#fff"
        strokeWidth="1.38"
        d="m59.82 49.86-1.83-6.82m3.61 7 3.53-6.11m-1.87 7.51 6.12-3.53"
      />
      <defs>
        <filter
          id="play-button-with-cursor-filter-1"
          width="51.17"
          height="57.01"
          x="32.19"
          y="22.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1946_101706"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1946_101706"
            result="shape"
          />
        </filter>
        <filter
          id="play-button-with-cursor-filter-2"
          width="21.53"
          height="24.68"
          x="57.93"
          y="51.95"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1.54" />
          <feGaussianBlur stdDeviation="1.39" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1946_101706"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1946_101706"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const PlayButtonWithCursorIcon = React.memo(
  PlayButtonWithCursorIconComponent
);
