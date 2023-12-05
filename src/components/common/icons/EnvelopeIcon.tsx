import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const EnvelopeIconComponent = (props: IconProps) => {
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
        clipPath="url(#envelope-clip-1)"
      >
        <path d="M14 3.5 8 9 2 3.5" />
        <path d="M2 3.5h12V12a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 2 12V3.5ZM6.9 8l-4.75 4.36m11.7 0L9.09 8" />
      </g>
      <defs>
        <clipPath id="envelope-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EnvelopeIcon = React.memo(EnvelopeIconComponent);
