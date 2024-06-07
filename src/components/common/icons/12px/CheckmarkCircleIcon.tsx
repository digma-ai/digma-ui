import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const CheckmarkCircleIconComponent = (props: IconProps) => {
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
        clipPath="url(#checkmark-circle-12px-clip-1)"
      >
        <path d="M4.13 6.38 5.25 7.5l2.63-2.63" />
        <path d="M6 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
      </g>
      <defs>
        <clipPath id="checkmark-circle-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckmarkCircleIcon = React.memo(CheckmarkCircleIconComponent);
