import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const TimerIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#timer-12px-clip-1)"
      >
        <path d="M6 10.125a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Zm-3.375-9-1.5 1.5m8.25-1.5 1.5 1.5" />
        <path d="M6 3.375V6h2.625" />
      </g>
      <defs>
        <clipPath id="timer-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TimerIcon = React.memo(TimerIconComponent);
