import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

interface EyeIconProps extends IconProps {
  crossOut?: boolean;
  className?: string;
}

const EyeIconComponent = (props: EyeIconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={props.className}
      viewBox="0 0 16 12"
      fill="none"
    >
      <g stroke={color} strokeLinecap="round">
        <path
          strokeLinejoin="round"
          d="M10.667 6.003a2.666 2.666 0 1 1-5.333 0 2.666 2.666 0 0 1 5.333 0Z"
        />
        <path
          strokeLinejoin="round"
          d="M1.333 6.001C2.4 2.88 4.891.668 8 .668c3.11 0 5.6 2.212 6.667 5.333C13.6 9.123 11.109 11.335 8 11.335c-3.11 0-5.6-2.212-6.667-5.334Z"
        />
        {props.crossOut && <path d="M2 11.335 14 .668" />}
      </g>
    </svg>
  );
};

export const EyeIcon = React.memo(EyeIconComponent);
