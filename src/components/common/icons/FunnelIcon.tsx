import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const FunnelIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#funnel-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.131 3.836A.5.5 0 0 1 2.5 3h11a.5.5 0 0 1 .37.836l-4.234 4.52a.5.5 0 0 0-.135.341v3.469a.5.5 0 0 1-.222.416l-2 1.333A.5.5 0 0 1 6.5 13.5V8.697a.5.5 0 0 0-.135-.341l-4.234-4.52Z"
        />
      </g>
      <defs>
        <clipPath id="funnel-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FunnelIcon = React.memo(FunnelIconComponent);
