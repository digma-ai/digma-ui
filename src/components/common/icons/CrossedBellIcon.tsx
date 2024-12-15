import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const CrossedBellIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 68 72"
    >
      <g filter="url(#crossed-bell-filter-1)">
        <path
          fill={color}
          d="M20.599 16.188a1.499 1.499 0 0 0-2.53 1.516 1.5 1.5 0 0 0 .31.502l3.138 3.454a14.905 14.905 0 0 0-2.032 7.537c0 6.626-1.55 11.696-2.591 13.489a3 3 0 0 0 2.59 4.511h7.654a7.5 7.5 0 0 0 14.699 0h2.896l3.646 4.009a1.499 1.499 0 0 0 2.529-1.515 1.501 1.501 0 0 0-.31-.503l-30-33Zm13.886 34.01a4.5 4.5 0 0 1-4.243-3h8.484a4.5 4.5 0 0 1-4.241 3Zm16.367-7.015a1.5 1.5 0 0 1-1.902-.265L26.718 18.461a1.5 1.5 0 0 1 .375-2.314 15 15 0 0 1 22.392 13.05c0 6.628 1.5 10.986 1.97 12.165a1.5 1.5 0 0 1-.6 1.82h-.003Z"
        />
      </g>
      <defs>
        <filter
          id="crossed-bell-filter-1"
          width="80"
          height="80"
          x="-5.515"
          y="-4.303"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2143_58430"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2143_58430"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const CrossedBellIcon = React.memo(CrossedBellIconComponent);
