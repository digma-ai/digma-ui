import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const DoubleCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 8 8"
    >
      <g clipPath="url(#double-circle-clip-1)">
        <path
          fill={color}
          d="M4 .75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Zm0 6a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Zm0-5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 4a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z"
        />
      </g>
      <defs>
        <clipPath id="double-circle-clip-1">
          <path fill="#fff" d="M0 0h8v8H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DoubleCircleIcon = React.memo(DoubleCircleIconComponent);
