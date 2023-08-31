import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CrossedBellDarkIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 68 72"
    >
      <g filter="url(#crossed-bell-dark-filter-1)">
        <path
          fill={color}
          d="M20.598 16.189a1.5 1.5 0 1 0-2.22 2.017l3.14 3.454a14.904 14.904 0 0 0-2.033 7.537c0 6.627-1.55 11.697-2.592 13.489a3 3 0 0 0 2.592 4.511h7.653a7.5 7.5 0 0 0 14.699 0h2.896l3.645 4.009a1.501 1.501 0 1 0 2.22-2.018l-30-33Zm13.887 34.008a4.5 4.5 0 0 1-4.243-3h8.484a4.5 4.5 0 0 1-4.241 3Zm16.367-7.014a1.5 1.5 0 0 1-1.902-.264L26.718 18.46a1.5 1.5 0 0 1 .375-2.314 15 15 0 0 1 22.392 13.05c0 6.628 1.5 10.986 1.97 12.165a1.5 1.5 0 0 1-.6 1.82h-.003Z"
        />
      </g>
      <defs>
        <filter
          id="crossed-bell-dark-filter-1"
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
            result="effect1_dropShadow_3980_5629"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3980_5629"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const CrossedBellDarkIcon = React.memo(CrossedBellDarkIconComponent);
