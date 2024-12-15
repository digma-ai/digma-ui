import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const CalendarIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 12 12">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 1v2m4-2v2m1.5-1h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-8 3h9"
      />
    </svg>
  );
};

export const CalendarIcon = React.memo(CalendarIconComponent);
