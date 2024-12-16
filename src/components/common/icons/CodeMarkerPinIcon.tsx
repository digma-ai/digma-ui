import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const CodeMarkerPinIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 14.67c1.33-2.67 5.33-4.4 5.33-8a5.33 5.33 0 1 0-10.66 0c0 3.6 4 5.33 5.33 8Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.43 8.71 11.14 7 9.43 5.29m-2.86 0L4.86 7l1.71 1.71"
      />
    </svg>
  );
};

export const CodeMarkerPinIcon = React.memo(CodeMarkerPinIconComponent);
