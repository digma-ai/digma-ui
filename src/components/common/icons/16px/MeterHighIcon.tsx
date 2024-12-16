import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const MeterHighIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8 9.33 2.67-2.66m-8.44 6a6.67 6.67 0 1 1 11.54 0"
      />
    </svg>
  );
};

export const MeterHighIcon = React.memo(MeterHighIconComponent);
