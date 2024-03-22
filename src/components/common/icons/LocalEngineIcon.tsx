import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

interface LocalEngineIconProps extends IconProps {
  width?: number;
  isActive?: boolean;
}

const LocalEngineIconComponent = (props: LocalEngineIconProps) => {
  const { color } = useIconProps(props);
  const status = props.isActive ? "#6EBD9C" : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 16}
      viewBox="0 0 16 14"
      fill={color}
    >
      <g stroke="#F0F1F7">
        <rect
          width="9.667"
          height="8.333"
          x="3.167"
          y=".833"
          rx=".833"
          fill={status}
        />
        <path d="M8 9v3.333m0 0H0m8 0h8" />
        <path strokeLinecap="round" strokeWidth="2" d="M6.667 12.334h2.666" />
      </g>
    </svg>
  );
};

export const LocalEngineIcon = React.memo(LocalEngineIconComponent);
