import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const CheckCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#check-circle-clip-1)"
      >
        <path d="M4.625 6.375 5.75 7.5l2.625-2.625" />
        <path d="M6.5 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
      </g>
      <defs>
        <clipPath id="check-circle-clip-1">
          <path fill="#fff" d="M.5 0h12v12H.5z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckCircleIcon = React.memo(CheckCircleIconComponent);
