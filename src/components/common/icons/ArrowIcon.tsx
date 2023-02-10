import React from "react";
import { useIconProps } from "./hooks";
import { DIRECTION, RotatableIconProps } from "./types";

const directionRotateMap: { [key in DIRECTION]: string } = {
  [DIRECTION.UP]: "0",
  [DIRECTION.LEFT]: "0",
  [DIRECTION.RIGHT]: "0",
  [DIRECTION.DOWN]: "90"
};

const ArrowIconComponent = (props: RotatableIconProps) => {
  const { size, color } = useIconProps(props);
  const transform = {
    transform: `rotate(${directionRotateMap[props.direction || DIRECTION.UP]})`
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...transform}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 24 24 8M11 8h13v13"
      />
    </svg>
  );
};

export const ArrowIcon = React.memo(ArrowIconComponent);
