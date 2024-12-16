import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const StopCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 13 13"
    >
      <path
        fill={color}
        d="M6.5 1.625a4.875 4.875 0 1 0 0 9.75 4.875 4.875 0 0 0 0-9.75Zm0 9a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25ZM7.625 5h-2.25A.375.375 0 0 0 5 5.375v2.25A.375.375 0 0 0 5.375 8h2.25A.375.375 0 0 0 8 7.625v-2.25A.375.375 0 0 0 7.625 5ZM7.25 7.25h-1.5v-1.5h1.5v1.5Z"
      />
    </svg>
  );
};

export const StopCircleIcon = React.memo(StopCircleIconComponent);
