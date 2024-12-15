import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const CrossCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#cross-circle-20px-clip-1)"
      >
        <path d="m12.5 7.5-5 5m0-5 5 5m-2.5 5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
      </g>
      <defs>
        <clipPath id="cross-circle-20px-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CrossCircleIcon = React.memo(CrossCircleIconComponent);
