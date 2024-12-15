import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const BellIconComponent = (props: IconProps) => {
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
        d="M10.397 8.247c-.26-.448-.647-1.716-.647-3.372a3.75 3.75 0 0 0-7.5 0c0 1.657-.387 2.924-.647 3.372a.75.75 0 0 0 .647 1.128h1.913a1.875 1.875 0 0 0 3.674 0H9.75a.75.75 0 0 0 .647-1.128ZM6 10.125a1.125 1.125 0 0 1-1.06-.75h2.12a1.125 1.125 0 0 1-1.06.75Zm-3.75-1.5c.36-.62.75-2.059.75-3.75a3 3 0 1 1 6 0c0 1.69.388 3.128.75 3.75h-7.5Z"
      />
    </svg>
  );
};

export const BellIcon = React.memo(BellIconComponent);
