import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const QuestionMarkIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none">
      <path stroke="#000" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" />
      <path stroke={color} d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" />
      <path
        fill={color}
        d="M8.038 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125Z"
      />
      <path
        stroke="#000"
        d="M8 10v-.571c0-.476.238-.921.634-1.185l.4-.267A2.173 2.173 0 0 0 10 6.171V6a2 2 0 1 0-4 0"
      />
      <path
        stroke={color}
        d="M8 10v-.571c0-.476.238-.921.634-1.185l.4-.267A2.173 2.173 0 0 0 10 6.171V6a2 2 0 1 0-4 0"
      />
    </svg>
  );
};

export const QuestionMarkIcon = React.memo(QuestionMarkIconComponent);
