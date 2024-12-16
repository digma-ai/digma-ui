import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const ListIconComponent = (props: IconProps) => {
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
        d="M5 10h11.5M5 13h9m-9 3h5M5 7h10"
      />
    </svg>
  );
};

export const ListIcon = React.memo(ListIconComponent);
