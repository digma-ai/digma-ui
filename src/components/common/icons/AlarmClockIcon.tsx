import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const AlarmClockIconComponent = (props: IconProps) => {
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
        strokeLinejoin="round"
        d="m6.33 5-2 2m13.34 0-2-2M7 15.67 5.67 17M15 15.67 16.33 17M11 9v2.67L12.33 13M11 17a5.33 5.33 0 1 0 0-10.67A5.33 5.33 0 0 0 11 17Z"
      />
    </svg>
  );
};

export const AlarmClockIcon = React.memo(AlarmClockIconComponent);
