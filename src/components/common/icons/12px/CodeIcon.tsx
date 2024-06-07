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
      viewBox="0 0 12 12"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#code-12-px-12px-clip-1)"
      >
        <path d="M3 4.13.75 6 3 7.88m6-3.75L11.25 6 9 7.88m-1.5-6-3 8.25" />
      </g>
      <defs>
        <clipPath id="code-12px-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CodeIcon = React.memo(CodeIconComponent);
