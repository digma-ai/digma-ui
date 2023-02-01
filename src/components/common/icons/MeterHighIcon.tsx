import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const MeterHighIconComponent = (props: IconProps) => {
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
        d="M5.94 11c0-2.7 2.2-4.9 4.9-4.9M14 7.85 10.84 11m.7 0a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Z"
      />
    </svg>
  );
};

export const MeterHighIcon = React.memo(MeterHighIconComponent);
