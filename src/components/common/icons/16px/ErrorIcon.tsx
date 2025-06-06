import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const ErrorIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#error-icon-16px-clip-1)"
      >
        <path d="m10 6-4 4m0-4 4 4m-2 4A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" />
      </g>
      <defs>
        <clipPath id="error-icon-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ErrorIcon = React.memo(ErrorIconComponent);
