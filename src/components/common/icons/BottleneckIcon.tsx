import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const BottleneckIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        d="M15.13 4.25 12.5 8v5.63l2.63 4.12m-8.25 0L9.5 14V8.37L6.87 4.25m8.63 10.5A5.53 5.53 0 0 0 17 11c0-1.42-.56-2.73-1.5-3.75m-9 0A5.53 5.53 0 0 0 5 11c0 1.42.56 2.73 1.5 3.75"
      />
    </svg>
  );
};

export const BottleneckIcon = React.memo(BottleneckIconComponent);
