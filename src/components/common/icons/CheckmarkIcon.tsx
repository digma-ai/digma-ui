import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

interface CheckmarkIconComponentProps extends IconProps {
  height?: number;
}

const CheckmarkIconComponent = (props: CheckmarkIconComponentProps) => {
  const { color } = useIconProps(props);
  const height = props.height ?? 4;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      fill="none"
      viewBox="0 0 6 4"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.06.88 2.31 3.5.94 2.19"
      />
    </svg>
  );
};

export const CheckmarkIcon = React.memo(CheckmarkIconComponent);
