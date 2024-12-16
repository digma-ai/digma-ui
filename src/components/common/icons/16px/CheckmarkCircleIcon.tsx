import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const CheckmarkCircleIconComponent = (props: IconProps) => {
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
        clipPath="url(#checkmark-circle-16px-clip-1)"
      >
        <path d="M5.5 8.5 7 10l3.5-3.5" />
        <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckmarkCircleIcon = React.memo(CheckmarkCircleIconComponent);
