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
      viewBox="0 0 38 38"
      fill="none"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#check-circle-38px-clip-1)"
      >
        <path d="m13.06 20.19 3.56 3.56 8.32-8.31" />
        <path d="M19 33.25a14.25 14.25 0 1 0 0-28.5 14.25 14.25 0 0 0 0 28.5Z" />
      </g>
      <defs>
        <clipPath id="check-circle-38px-clip-1">
          <path fill="#fff" d="M0 0h38v38H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckCircleIcon = React.memo(CheckCircleIconComponent);
