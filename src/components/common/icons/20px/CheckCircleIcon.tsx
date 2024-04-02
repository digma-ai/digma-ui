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
      viewBox="0 0 20 20"
      fill="none"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#check-circle-clip-1)"
      >
        <path d="M6.875 10.625 8.75 12.5l4.375-4.375" />
        <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
      </g>
      <defs>
        <clipPath id="check-circle-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckCircleIcon = React.memo(CheckCircleIconComponent);
