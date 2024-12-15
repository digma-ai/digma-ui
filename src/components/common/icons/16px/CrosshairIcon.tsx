import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const CrosshairIconComponent = (props: IconProps) => {
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
        clipPath="url(#crosshair-16px-clip-1)"
      >
        <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM8 2v2.5m0 7V14M2 8h2.5m7 0H14" />
      </g>
      <defs>
        <clipPath id="crosshair-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CrosshairIcon = React.memo(CrosshairIconComponent);
