import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const TargetIconComponent = (props: IconProps) => {
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
        clipPath="url(#target-clip-1)"
      >
        <path d="M6 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-9v1.88m0 5.25v1.87M1.5 6h1.88m5.25 0h1.87" />
      </g>
      <defs>
        <clipPath id="target-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TargetIcon = React.memo(TargetIconComponent);
