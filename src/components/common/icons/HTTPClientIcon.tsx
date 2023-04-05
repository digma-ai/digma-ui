import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const HTTPClientIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        stroke={color}
        strokeLinejoin="round"
        clipPath="url(#http-client-clip-1)"
      >
        <path strokeLinecap="round" d="M13 11.333 14.667 13 13 14.667" />
        <path d="M2.667 4a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z" />
        <path
          strokeLinecap="round"
          d="M4 2.667h2.667A1.333 1.333 0 0 1 8 4v7.667A1.334 1.334 0 0 0 9.333 13h5.334"
        />
      </g>
      <defs>
        <clipPath id="http-client-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HTTPClientIcon = React.memo(HTTPClientIconComponent);
