import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ChainIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <g stroke={color} strokeLinecap="round">
        <path d="M5.828 8.2c-.904-.908-.822-2.46.181-3.468l2.909-2.92C9.922.806 11.468.724 12.372 1.63c.904.906.822 2.46-.182 3.468l-1.454 1.46" />
        <path d="M8.172 5.797c.904.907.822 2.46-.181 3.467l-1.455 1.46-1.454 1.46c-1.004 1.007-2.55 1.089-3.454.182-.904-.906-.822-2.46.182-3.467l1.454-1.46" />
      </g>
    </svg>
  );
};

export const ChainIcon = React.memo(ChainIconComponent);
