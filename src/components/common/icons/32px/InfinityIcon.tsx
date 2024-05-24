import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const InfinityIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 33 32"
    >
      <g clipPath="url(#infinity-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.17 19.02 1.09 1.22a6 6 0 1 0 0-8.48l-7.52 8.48a6 6 0 1 1 0-8.48l1.09 1.22"
        />
      </g>
      <defs>
        <clipPath id="infinity-clip-1">
          <path fill="#fff" d="M32.5 0H.5v32h32z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const InfinityIcon = React.memo(InfinityIconComponent);
