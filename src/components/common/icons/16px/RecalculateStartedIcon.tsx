import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const RecalculateStartedIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g stroke={color} strokeLinecap="round">
        <path d="M7 2.275a6.575 6.575 0 0 0-4.092 1.42A6.223 6.223 0 0 0 .674 7.31a6.088 6.088 0 0 0 .638 4.168 6.383 6.383 0 0 0 3.22 2.83 6.639 6.639 0 0 0 4.34.207 6.437 6.437 0 0 0 3.491-2.51 6.109 6.109 0 0 0 1.056-4.088 6.177 6.177 0 0 0-1.858-3.81" />
        <path d="m9.867 7.141-2.579 3.001c-.47.546-.704.82-1.02.834-.316.014-.576-.238-1.095-.742l-1.04-1.008m1.76-8.062 1.415 1.048-1.081 1.373" />
      </g>
    </svg>
  );
};

export const RecalculateStartedIcon = React.memo(
  RecalculateStartedIconComponent
);
