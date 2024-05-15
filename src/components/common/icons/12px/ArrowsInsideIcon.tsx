import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ArrowsInsideIconComponent = (props: IconProps) => {
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
        clipPath="url(#arrows-inside-clip-1)"
      >
        <path d="M9 5.25H6.75V3m3-.75-3 3M3 6.75h2.25V9m-3 .75 3-3" />
      </g>
      <defs>
        <clipPath id="arrows-inside-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowsInsideIcon = React.memo(ArrowsInsideIconComponent);
