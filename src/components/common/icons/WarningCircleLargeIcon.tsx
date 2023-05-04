import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const WarningCircleLargeIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#warning-circle-clip-1)">
        <path
          fill={color}
          d="M6 0a6 6 0 1 0 0 12A6 6 0 1 0 6 0Zm0 11.25A5.256 5.256 0 0 1 .75 6 5.256 5.256 0 0 1 6 .75 5.256 5.256 0 0 1 11.25 6 5.256 5.256 0 0 1 6 11.25Zm0-4.125a.375.375 0 0 0 .375-.375V3a.375.375 0 1 0-.75 0v3.75c0 .206.169.375.375.375Zm0 .938a.563.563 0 1 0 0 1.125.563.563 0 0 0 0-1.126Z"
        />
      </g>
      <defs>
        <clipPath id="warning-circle-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const WarningCircleLargeIcon = React.memo(
  WarningCircleLargeIconComponent
);
