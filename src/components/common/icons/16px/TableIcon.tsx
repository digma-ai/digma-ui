import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const TableIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6.889h10M6.889 3v10M3 4.111A1.111 1.111 0 0 1 4.111 3h7.778A1.111 1.111 0 0 1 13 4.111v7.778A1.111 1.111 0 0 1 11.889 13H4.11A1.111 1.111 0 0 1 3 11.889V4.11Z"
      />
    </svg>
  );
};

export const TableIcon = React.memo(TableIconComponent);
