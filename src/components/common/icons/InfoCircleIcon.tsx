import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const InfoCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#info-circle-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.625 5.625A.375.375 0 0 1 6 6v1.875a.375.375 0 0 0 .375.375"
        />
        <path
          fill={color}
          d="M5.813 4.313a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Z"
        />
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
        />
      </g>
      <defs>
        <clipPath id="info-circle-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const InfoCircleIcon = React.memo(InfoCircleIconComponent);
