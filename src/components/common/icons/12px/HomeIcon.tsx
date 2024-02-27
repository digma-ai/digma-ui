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
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#home-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.13 9.75V7.5a.38.38 0 0 0-.38-.38h-1.5a.37.37 0 0 0-.38.38v2.25a.38.38 0 0 1-.37.37H2.25a.38.38 0 0 1-.38-.37V5.42A.38.38 0 0 1 2 5.14L5.75 1.6a.38.38 0 0 1 .5 0L10 5.14a.38.38 0 0 1 .13.28v4.33a.37.37 0 0 1-.38.37H7.5a.38.38 0 0 1-.38-.37Z"
        />
      </g>
      <defs>
        <clipPath id="home-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HomeIcon = React.memo(HomeIconComponent);
