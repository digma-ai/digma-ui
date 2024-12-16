import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const MeterMediumIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".95"
        d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".95"
        d="M11 6.04V11m.76 0a.76.76 0 1 1-1.52 0 .76.76 0 0 1 1.52 0Z"
      />
    </svg>
  );
};

export const MeterMediumIcon = React.memo(MeterMediumIconComponent);
