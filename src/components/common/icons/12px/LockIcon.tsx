import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const LockIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.952 6.394V4.056c0-.826.321-1.62.893-2.204A3.014 3.014 0 0 1 6 .94c.808 0 1.583.329 2.155.913.572.585.893 1.378.893 2.204v2.338"
      />
      <rect
        width="10.667"
        height="7.792"
        x=".667"
        y="6.394"
        stroke={color}
        rx="2"
      />
    </svg>
  );
};

export const LockIcon = React.memo(LockIconComponent);
