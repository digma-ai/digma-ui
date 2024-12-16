import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

export const ClockWithTicksIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g clipPath="url(#clock-with-ticks-20px-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.5 10.625c-.318 3.85-3.568 6.875-7.5 6.875A7.5 7.5 0 0 1 2.5 10c0-3.932 3.025-7.182 6.875-7.5"
        />
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 5.625V10h4.375"
        />
        <path
          fill={color}
          d="M12.5 3.438a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Zm2.813 1.875a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Zm1.875 2.812a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z"
        />
      </g>
      <defs>
        <clipPath id="clock-with-ticks-20px-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ClockWithTicksIcon = React.memo(ClockWithTicksIconComponent);
