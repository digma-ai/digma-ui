import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const PlusIconComponent = (props: IconProps) => {
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
        fill={color}
        d="M10.5 6a.375.375 0 0 1-.375.375h-3.75v3.75a.375.375 0 0 1-.75 0v-3.75h-3.75a.375.375 0 1 1 0-.75h3.75v-3.75a.375.375 0 1 1 .75 0v3.75h3.75A.375.375 0 0 1 10.5 6Z"
      />
    </svg>
  );
};

export const PlusIcon = React.memo(PlusIconComponent);
