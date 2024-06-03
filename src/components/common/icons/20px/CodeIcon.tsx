import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

export const CodeIconComponent = (props: IconProps) => {
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
        clipPath="url(#code-20px-clip-1)"
      >
        <path d="M5 6.88 1.25 10 5 13.13m10-6.25L18.75 10 15 13.13m-2.5-10-5 13.75" />
      </g>
      <defs>
        <clipPath id="code-20px-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CodeIcon = React.memo(CodeIconComponent);
