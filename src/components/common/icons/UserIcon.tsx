import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const UserIconComponent = (props: IconProps) => {
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
        d="M3.5442 12.9589c.4056-.9555 1.3525-1.6256 2.4558-1.6256h4c1.1034 0 2.0503.6702 2.4558 1.6256m-1.7891-6.6256C10.6667 7.8061 9.4728 9 8 9 6.5273 9 5.3334 7.806 5.3334 6.3333c0-1.4728 1.1939-2.6667 2.6666-2.6667 1.4728 0 2.6667 1.194 2.6667 2.6667Zm4 1.6667c0 3.6819-2.9848 6.6666-6.6667 6.6666-3.6819 0-6.6666-2.9847-6.6666-6.6666C1.3334 4.318 4.318 1.3333 8 1.3333c3.6819 0 6.6667 2.9848 6.6667 6.6667Z"
      />
    </svg>
  );
};

export const UserIcon = React.memo(UserIconComponent);
