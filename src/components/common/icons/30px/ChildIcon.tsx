import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const ChildIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      >
        <path stroke="#ACAFBF" d="M6.082 1.05V10" />
        <path stroke="#A1B5FF" d="M6.082 14.48v6.525a2 2 0 0 0 2 2h11.1" />
        <path
          stroke="#A1B5FF"
          d="M23.659 18.512a4.487 4.487 0 0 0-4.494 4.494 4.487 4.487 0 0 0 4.494 4.494 4.487 4.487 0 0 0 4.494-4.494 4.487 4.487 0 0 0-4.494-4.494Z"
        />
        <path stroke="#ACAFBF" d="M6.75 5h5m3.75 0h5" />
      </g>
    </svg>
  );
};

export const ChildIcon = React.memo(ChildIconComponent);
