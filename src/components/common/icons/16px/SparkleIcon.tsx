import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const SparkleIconComponent = (props: IconProps) => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#sparkle-clip-1)"
      >
        <path d="M5.05 10.65 1.82 9.47a.5.5 0 0 1 0-.93l3.23-1.19a.5.5 0 0 0 .3-.3l1.18-3.22a.5.5 0 0 1 .93 0l1.19 3.23a.5.5 0 0 0 .3.3l3.22 1.18a.5.5 0 0 1 0 .93l-3.23 1.18a.5.5 0 0 0-.3.3l-1.18 3.23a.5.5 0 0 1-.93 0l-1.18-3.23a.5.5 0 0 0-.3-.3ZM11 1v3m3 .5v2m-4.5-4h3m.5 3h2" />
      </g>
      <defs>
        <clipPath id="sparkle-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SparkleIcon = React.memo(SparkleIconComponent);
