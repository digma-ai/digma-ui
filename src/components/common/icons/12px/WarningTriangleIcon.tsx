import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const WarningTriangleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#warning-triangle-12px-clip-1)">
        <path
          stroke={color}
          d="M5.13 2.5a1 1 0 0 1 1.74 0l3.46 6a1 1 0 0 1-.87 1.5H2.54a1 1 0 0 1-.87-1.5l3.46-6Z"
        />
        <path
          stroke={color}
          strokeLinecap="round"
          strokeWidth=".85"
          d="M6 4.5v2"
        />
        <circle cx="6" cy="8" r=".5" fill={color} />
      </g>
      <defs>
        <clipPath id="warning-triangle-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const WarningTriangleIcon = React.memo(WarningTriangleIconComponent);
