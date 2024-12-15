import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const CrossIconComponent = (props: IconProps) => {
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
        clipPath="url(#cross-16px-clip-1)"
      >
        <path d="m12.5 3.5-9 9m9 0-9-9" />
      </g>
      <defs>
        <clipPath id="cross-16px-clip-1">
          <path fill={color} d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CrossIcon = React.memo(CrossIconComponent);
