import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

interface EyeIconProps extends IconProps {
  crossOut?: boolean;
}

const EyeIconComponent = (props: EyeIconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 6c.8-2.34 2.67-4 5-4s4.2 1.66 5 4c-.8 2.34-2.67 4-5 4S1.8 8.34 1 6Z"
      />
      {props.crossOut && (
        <path stroke={color} strokeLinecap="round" d="m1.5 10 9-8" />
      )}
    </svg>
  );
};

export const EyeIcon = React.memo(EyeIconComponent);
