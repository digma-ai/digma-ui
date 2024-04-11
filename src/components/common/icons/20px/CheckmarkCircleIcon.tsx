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
      viewBox="0 0 20 20"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#checkmark-circle-clip-1)"
      >
        <path d="m6.88 10.63 1.87 1.87 4.38-4.38" />
        <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
      </g>
      <defs>
        <clipPath id="checkmark-circle-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckmarkCircleIcon = React.memo(CheckmarkCircleIconComponent);
