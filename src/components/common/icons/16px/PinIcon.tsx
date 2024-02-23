import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const PinIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#a)"
      >
        <path d="M14.354 6.146a.5.5 0 0 0 0-.707l-3.791-3.793a.5.5 0 0 0-.707 0L6.274 5.238s-1.734-.867-3.586.628a.5.5 0 0 0-.041.744l6.744 6.743a.5.5 0 0 0 .75-.052c.524-.697 1.348-2.13.632-3.562l3.58-3.593ZM6.018 9.982 3 13.001" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PinIcon = React.memo(PinIconComponent);
