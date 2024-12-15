import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const TerminalIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M17.5 5h-11a2.002 2.002 0 0 0-2 2v10a2.002 2.002 0 0 0 2 2h11a2.003 2.003 0 0 0 2-2V7a2.002 2.002 0 0 0-2-2ZM7 12a.5.5 0 0 1-.313-.89L8.7 9.5 6.688 7.89a.5.5 0 0 1 .625-.78l2.5 2a.5.5 0 0 1 0 .78l-2.5 2A.5.5 0 0 1 7 12Zm5 0h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 0 1Z"
      />
    </svg>
  );
};

export const TerminalIcon = React.memo(TerminalIconComponent);
