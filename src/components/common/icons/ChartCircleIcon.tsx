import React from "react";
import { useIconProps } from "./hooks";
import { ThemeableIconProps } from "./types";

const ChartCircleIconComponent = (props: ThemeableIconProps) => {
  const { size } = useIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 72 72"
    >
      <circle
        cx="36"
        cy="36"
        r="36"
        fill={props.themeKind === "light" ? "#d0d6eb" : "#323334"}
      />
      <g clipPath="url(#chart-clip-1)">
        <path
          stroke={props.themeKind === "light" ? "#f1f5fa" : "#49494d"}
          strokeDasharray="3 3"
          d="M16.468 48.249V23.254m12 24.995V22.994m12 25.255V22.994m12 25.255V22.994m12 25.255v-28.64"
        />
        <path
          stroke={props.themeKind === "light" ? "#f1f5fa" : "#49494d"}
          strokeLinecap="round"
          strokeWidth="2"
          d="M8 23v25h56"
        />
        <path
          stroke={props.themeKind === "light" ? "#426dda" : "#9b9b9b"}
          strokeLinecap="round"
          d="m9 47 8.502-6.346 14.348-1.616 2.126-5.769L47.792 32 64 34.654"
        />
      </g>
      <defs>
        <clipPath id="chart-clip-1">
          <path fill="#fff" d="M7 22h58v27H7z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ChartCircleIcon = React.memo(ChartCircleIconComponent);
