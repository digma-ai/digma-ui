import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const HistogramIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.25 5h-2.5c-.69 0-1.25.65-1.25 1.46v14.58c0 .8.56 1.46 1.25 1.46h2.5c.69 0 1.25-.65 1.25-1.46V6.46c0-.8-.56-1.46-1.25-1.46Zm-10 5h-2.5c-.69 0-1.25.62-1.25 1.39v9.72c0 .77.56 1.39 1.25 1.39h2.5c.69 0 1.25-.62 1.25-1.39V11.4c0-.77-.56-1.39-1.25-1.39Zm20 2.5h-2.5c-.69 0-1.25.5-1.25 1.11v7.78c0 .61.56 1.11 1.25 1.11h2.5c.69 0 1.25-.5 1.25-1.11V13.6c0-.61-.56-1.11-1.25-1.11Z"
      />
    </svg>
  );
};

export const HistogramIcon = React.memo(HistogramIconComponent);
