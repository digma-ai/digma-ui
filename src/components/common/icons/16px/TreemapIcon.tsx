import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const TreemapIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g stroke={color}>
        <rect width="3" height="5" x="4.5" y="8" rx="1" />
        <rect width="8" height="3" x="4.5" y="3" rx="1" />
        <rect width="3" height="5" x="9.5" y="8" rx="1" />
      </g>
    </svg>
  );
};

export const TreemapIcon = React.memo(TreemapIconComponent);
