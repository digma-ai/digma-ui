import React from "react";
import { useIconProps } from "./hooks";
import { DIRECTION, RotatableIconProps } from "./types";

const directionRotateMap: { [key in DIRECTION]: string } = {
  [DIRECTION.DOWN]: "0",
  [DIRECTION.RIGHT]: "90",
  [DIRECTION.UP]: "180",
  [DIRECTION.LEFT]: "270"
};

const ChevronIconComponent = (props: RotatableIconProps) => {
  const { size, color } = useIconProps(props);

  const transform = {
    transform: `rotate(${
      directionRotateMap[props.direction || DIRECTION.DOWN]
    })`
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
      {...transform}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 4.5 6 8.25 2.25 4.5"
      />
    </svg>
  );
};

export const ChevronIcon = React.memo(ChevronIconComponent);
