import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

interface LocalEngineIconProps extends IconProps {
  isActive?: boolean;
}

const LocalEngineIconComponent = (props: LocalEngineIconProps) => {
  const { size, color } = useIconProps(props);
  const fillColor = props.isActive ? "#6EBD9C" : "#37383F";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <rect
        width="10.67"
        height="9.33"
        x="2.67"
        y="1.33"
        fill={fillColor}
        rx="1.33"
      />
      <rect
        width="9.67"
        height="8.33"
        x="3.17"
        y="1.83"
        stroke={color}
        rx=".83"
      />
      <path stroke={color} d="M8 10v3.33m0 0H0m8 0h8" />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
        d="M6.67 13.33h2.66"
      />
    </svg>
  );
};

export const LocalEngineIcon = React.memo(LocalEngineIconComponent);
