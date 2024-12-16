import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const ArrowsOutsideIconComponent = (props: IconProps) => {
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
        clipPath="url(#arrows-outside-12px-clip-1)"
      >
        <path d="M7.5 2.25h2.25V4.5m-3 .75 3-3M4.5 9.75H2.25V7.5m3-.75-3 3" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#arrows-outside-12px-clip-1" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowsOutsideIcon = React.memo(ArrowsOutsideIconComponent);
