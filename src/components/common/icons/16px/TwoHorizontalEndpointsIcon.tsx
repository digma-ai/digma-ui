import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const TwoHorizontalEndpointsIconComponent = (props: IconProps) => {
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
        d="M13 9c-.929 0-1.705.64-1.929 1.5H1v1h10.071c.2235.86 1 1.5 1.929 1.5 1.103 0 2-.897 2-2s-.897-2-2-2Zm0 3c-.5515 0-1-.4485-1-1s.4485-1 1-1 1 .4485 1 1-.4485 1-1 1Zm0-9c-.929 0-1.705.64-1.929 1.5H1v1h10.071c.2235.86 1 1.5 1.929 1.5 1.103 0 2-.897 2-2s-.897-2-2-2Zm0 3c-.5515 0-1-.4485-1-1s.4485-1 1-1 1 .4485 1 1-.4485 1-1 1Z"
      />
    </svg>
  );
};

export const TwoHorizontalEndpointsIcon = React.memo(
  TwoHorizontalEndpointsIconComponent
);
