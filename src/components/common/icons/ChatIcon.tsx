import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const ChatIconComponent = (props: IconProps) => {
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
        fill={color}
        d="M13.5 5h-2V3a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v8a.5.5 0 0 0 .81.39L4.5 9.62v1.88a1 1 0 0 0 1 1h5.85l2.34 1.89a.5.5 0 0 0 .81-.39V6a1 1 0 0 0-1-1ZM4.16 8.61 2.5 9.95V3h8v5.5H4.47a.5.5 0 0 0-.31.11Zm9.34 4.34-1.66-1.34a.5.5 0 0 0-.31-.11H5.5v-2h5a1 1 0 0 0 1-1V6h2v6.95Z"
      />
    </svg>
  );
};

export const ChatIcon = React.memo(ChatIconComponent);
