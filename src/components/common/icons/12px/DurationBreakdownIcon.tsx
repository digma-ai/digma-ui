import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const DurationBreakdownIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 13 12" fill="none">
      <g clipPath="url(#duration-breakdown-a)">
        <path
          stroke="#ACAFBF"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 6.375c-.19 2.31-2.14 4.125-4.5 4.125A4.5 4.5 0 0 1 2 6c0-2.36 1.815-4.31 4.125-4.5"
        />
        <path
          stroke="#ACAFBF"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.5 3.375V6h2.625"
        />
        <path
          fill="#ACAFBF"
          d="M8 2.063a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Zm1.688 1.125a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Zm1.125 1.687a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Z"
        />
      </g>
      <defs>
        <clipPath id="duration-breakdown-a">
          <path fill="#fff" d="M.5 0h12v12H.5z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DurationBreakdownIcon = React.memo(DurationBreakdownIconComponent);
