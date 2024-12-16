import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const TableIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.97 9.86v6.16M5 9.86h11.75M16.5 6h-11a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5Z"
      />
    </svg>
  );
};

export const TableIcon = React.memo(TableIconComponent);
