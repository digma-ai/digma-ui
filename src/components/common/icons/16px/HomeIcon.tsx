import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const HomeIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#home-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.5 13v-3a.5.5 0 0 0-.5-.5H7a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V7.22a.5.5 0 0 1 .16-.37l5-4.72a.5.5 0 0 1 .68 0l5 4.72a.5.5 0 0 1 .16.37V13a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5Z"
        />
      </g>
      <defs>
        <clipPath id="home-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HomeIcon = React.memo(HomeIconComponent);
