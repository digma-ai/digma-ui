import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const CodeIconComponent = (props: IconProps) => {
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
        clipPath="url(#code-16px-clip-1)"
      >
        <path d="M4 5.5 1 8l3 2.5m8-5L15 8l-3 2.5m-2-8-4 11" />
      </g>
      <defs>
        <clipPath id="code-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CodeIcon = React.memo(CodeIconComponent);
