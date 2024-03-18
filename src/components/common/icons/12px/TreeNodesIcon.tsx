import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const TreeNodesIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g stroke={color} clipPath="url(#tree-nodes-clip-1)">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 8V5.5h8V8M6 1v4.5"
        />
        <circle cx="10" cy="9.71" r="1.5" />
        <circle cx="2" cy="9.71" r="1.5" />
      </g>
      <defs>
        <clipPath id="tree-nodes-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TreeNodesIcon = React.memo(TreeNodesIconComponent);
