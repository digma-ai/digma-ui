import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const MetricsIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 7 2-2M1.67 9.5a5 5 0 1 1 8.66 0"
      />
    </svg>
  );
};

export const MetricsIcon = React.memo(MetricsIconComponent);
