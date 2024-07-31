import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const FourPointedStarIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none">
      <g clipPath="url(#four-pointed-star-12px-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.432 7.655 6.351 10.63a.375.375 0 0 1-.703 0l-1.08-2.974a.375.375 0 0 0-.223-.223L1.37 6.351a.375.375 0 0 1 0-.704l2.974-1.08a.375.375 0 0 0 .223-.222L5.65 1.37a.375.375 0 0 1 .704 0l1.081 2.974a.375.375 0 0 0 .223.223l2.974 1.081a.375.375 0 0 1 0 .703L7.657 7.434a.375.375 0 0 0-.225.221Z"
        />
      </g>
      <defs>
        <clipPath id="four-pointed-star-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FourPointedStarIcon = React.memo(FourPointedStarIconComponent);
