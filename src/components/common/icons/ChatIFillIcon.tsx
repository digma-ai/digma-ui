import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const ChatFillIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 28 29"
    >
      <path
        fill={color}
        d="M25.38 11a1.75 1.75 0 0 0-1.75-1.75h-3.5v-3.5A1.75 1.75 0 0 0 18.38 4h-14a1.75 1.75 0 0 0-1.75 1.75v14a.87.87 0 0 0 1.42.68l3.83-3.09v3.29a1.75 1.75 0 0 0 1.75 1.75h10.23l4.1 3.3a.88.88 0 0 0 1.41-.68V11Zm-4.66 9.82a.88.88 0 0 0-.55-.2H9.62v-3.5h8.76a1.75 1.75 0 0 0 1.75-1.75V11h3.5v12.17l-2.9-2.35Z"
      />
    </svg>
  );
};

export const ChatFillIcon = React.memo(ChatFillIconComponent);
