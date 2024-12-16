import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

export const CodeGradientIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#code-gradient-20px-clip-1)"
      >
        <path
          stroke="url(#code-gradient-20px-clip-2)"
          d="M5 6.88 1.25 10 5 13.13"
        />
        <path
          stroke="url(#code-gradient-20px-clip-3)"
          d="M15 6.88 18.75 10 15 13.13"
        />
        <path stroke="url(#code-gradient-20px-clip-4)" d="m12.5 3.13-5 13.75" />
      </g>
      <defs>
        <linearGradient
          id="code-gradient-20px-clip-2"
          x1="1.25"
          x2="5.56"
          y1="6.88"
          y2="7.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".11" stopColor="#7B5DB2" stopOpacity=".5" />
          <stop offset=".97" stopColor="#6568CF" />
        </linearGradient>
        <linearGradient
          id="code-gradient-20px-clip-3"
          x1="15"
          x2="19.31"
          y1="6.88"
          y2="7.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".11" stopColor="#7B5DB2" stopOpacity=".5" />
          <stop offset=".97" stopColor="#6568CF" />
        </linearGradient>
        <linearGradient
          id="code-gradient-20px-clip-4"
          x1="7.5"
          x2="13.3"
          y1="3.13"
          y2="3.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".11" stopColor="#7B5DB2" stopOpacity=".5" />
          <stop offset=".97" stopColor="#6568CF" />
        </linearGradient>
        <clipPath id="code-gradient-20px-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CodeGradientIcon = React.memo(CodeGradientIconComponent);
