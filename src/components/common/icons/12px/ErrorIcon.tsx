import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ErrorIconComponent = (props: IconProps) => {
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
        clipPath="url(#error-icon)"
      >
        <path d="m7.5 4.5-3 3m0-3 3 3m-1.5 3a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
      </g>
      <defs>
        <clipPath id="#error-icon">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ErrorIcon = React.memo(ErrorIconComponent);
