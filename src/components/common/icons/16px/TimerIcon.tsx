import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const TimerIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#timer-16px-clip-1)"
      >
        <path d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm-4.5-12-2 2m11-2 2 2" />
        <path d="M8 4.5V8h3.5" />
      </g>
      <defs>
        <clipPath id="timer-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TimerIcon = React.memo(TimerIconComponent);
