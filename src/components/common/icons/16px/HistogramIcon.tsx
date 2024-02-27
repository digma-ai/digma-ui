import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const HistogramIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g stroke={color}>
        <rect width="12.333" height="12.333" x="1.833" y="1.834" rx=".5" />
        <path d="M5.333 12V6.665M10.667 12V8M8 12V4" />
      </g>
    </svg>
  );
};

export const HistogramIcon = React.memo(HistogramIconComponent);
