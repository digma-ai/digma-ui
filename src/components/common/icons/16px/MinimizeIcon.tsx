import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const MinimizeIconComponent = (props: IconProps) => {
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
        clipPath="url(#minimize-clip-1)"
      >
        <path d="M1.33 9.33h5.34v5.34m8-8H9.33V1.33" />
      </g>
      <defs>
        <clipPath id="minimize-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const MinimizeIcon = React.memo(MinimizeIconComponent);
