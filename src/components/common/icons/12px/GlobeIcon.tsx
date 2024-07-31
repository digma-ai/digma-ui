import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const GlobeIconComponent = (props: IconProps) => {
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
        clipPath="url(#globe-12px-clip-1)"
      >
        <path d="M6 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
        <path d="M4.13 6c0 1.76.62 3.32 1.6 4.38a.36.36 0 0 0 .54 0A6.45 6.45 0 0 0 7.87 6c0-1.76-.62-3.32-1.6-4.38a.36.36 0 0 0-.54 0A6.45 6.45 0 0 0 4.13 6ZM1.76 4.5h8.48m-8.48 3h8.48" />
      </g>
      <defs>
        <clipPath id="url(#globe-12px-clip-1)">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GlobeIcon = React.memo(GlobeIconComponent);
