import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PageIconComponent = (props: IconProps) => {
  const { color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="40"
      fill="none"
      viewBox="0 0 32 40"
    >
      <path
        fill={color}
        d="M0 4a4 4 0 0 1 4-4h16l12 12v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
      />
      <path fill="#000" d="m20 0 12 12h-8a4 4 0 0 1-4-4V0Z" opacity=".3" />
    </svg>
  );
};

export const PageIcon = React.memo(PageIconComponent);
