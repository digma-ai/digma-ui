import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const KeyIconIconComponent = (props: IconProps) => {
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
        d="M6.67 8a2.67 2.67 0 1 1-5.34 0 2.67 2.67 0 0 1 5.34 0Zm0 0h8v2M12 8v2"
      />
    </svg>
  );
};

export const KeyIcon = React.memo(KeyIconIconComponent);
