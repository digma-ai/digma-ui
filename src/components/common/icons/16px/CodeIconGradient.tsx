import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

interface CodeIconGradientProps extends IconProps {
  gradient?: "purple" | "orange";
}

const CodeIconGradientComponent = (props: CodeIconGradientProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 16 16"
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#code-gradient-clip-1)"
      >
        <path stroke="url(#code-gradient-stroke-1)" d="M4 5.5 1 8l3 2.5" />
        <path stroke="url(#code-gradient-stroke-2)" d="M12 5.5 15 8l-3 2.5" />
        <path stroke="url(#code-gradient-stroke-3)" d="m10 2.5-4 11" />
      </g>
      <defs>
        {props.gradient === "purple" && (
          <>
            <linearGradient
              id="code-gradient-stroke-1"
              x1="1"
              x2="4.448"
              y1="5.5"
              y2="5.917"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".11" stopColor="#7B5DB2" stopOpacity=".5" />
              <stop offset=".975" stopColor="#6568CF" />
            </linearGradient>
            <linearGradient
              id="code-gradient-stroke-2"
              x1="12"
              x2="15.448"
              y1="5.5"
              y2="5.917"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".11" stopColor="#7B5DB2" stopOpacity=".5" />
              <stop offset=".975" stopColor="#6568CF" />
            </linearGradient>
            <linearGradient
              id="code-gradient-stroke-3"
              x1="6"
              x2="10.639"
              y1="2.5"
              y2="2.84"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".11" stopColor="#7B5DB2" stopOpacity=".5" />
              <stop offset=".975" stopColor="#6568CF" />
            </linearGradient>
          </>
        )}
        {props.gradient === "orange" && (
          <>
            <linearGradient
              id="code-gradient-stroke-1"
              x1="2.5"
              x2="2.5"
              y1="5.5"
              y2="10.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA9054" />
              <stop offset="1" stopColor="#C78D3D" />
            </linearGradient>
            <linearGradient
              id="code-gradient-stroke-2"
              x1="13.5"
              x2="13.5"
              y1="5.5"
              y2="10.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA9054" />
              <stop offset="1" stopColor="#C78D3D" />
            </linearGradient>
            <linearGradient
              id="code-gradient-stroke-3"
              x1="8"
              x2="8"
              y1="2.5"
              y2="13.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA9054" />
              <stop offset="1" stopColor="#C78D3D" />
            </linearGradient>
          </>
        )}
        <clipPath id="code-gradient-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CodeIconGradient = React.memo(CodeIconGradientComponent);