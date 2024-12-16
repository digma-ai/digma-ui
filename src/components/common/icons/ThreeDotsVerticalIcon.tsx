import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const ThreeDotsVerticalIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM6 3a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm0 7a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
      />
    </svg>
  );
};

export const ThreeDotsVerticalIcon = React.memo(ThreeDotsVerticalIconComponent);
