import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const MagicWandIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="m5 3.7 1.7 1-1-1.7 1-1.7-1.7 1-1.7-1 1 1.7-1 1.7zm6.1 2.7L9.6 4.9c-.2-.3-.7-.3-.9 0L.9 12.7c-.3.3-.3.7 0 .9l1.6 1.6c.2.3.7.3.9 0l7.8-7.8c.2-.3.2-.7-.1-1zm-8.2 7.8-1.1-1.1L6.9 8 8 9.1l-5.1 5.1zm6-5.7L7.5 7.1l1.6-1.6 1.4 1.4-1.6 1.6zm5.8-7.2-1.7 1-1.7-1 1 1.7-1 1.7 1.7-1 1.7 1-1-1.7zm-1.7 9-1.7-1 1 1.7-1 1.7 1.7-1 1.7 1-1-1.7 1-1.7z"
      />
    </svg>
  );
};

export const MagicWandIcon = React.memo(MagicWandIconComponent);
