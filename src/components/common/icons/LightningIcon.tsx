import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const LightningIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 13"
    >
      <g clipPath="url(#lightning-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 1.25 6.75 5l3 1.125L4.5 11.75 5.25 8l-3-1.125L7.5 1.25Z"
        />
      </g>
      <defs>
        <clipPath id="lightning-clip-1">
          <path fill="#fff" d="M0 .5h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const LightningIcon = React.memo(LightningIconComponent);
