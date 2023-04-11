import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const GearIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M14.186 10.002 12.708 8.94a4.821 4.821 0 0 0 0-1.882L14.186 6a6.493 6.493 0 0 0-1.356-2.35l-1.658.748a4.794 4.794 0 0 0-1.635-.946l-.18-1.81a6.526 6.526 0 0 0-2.714 0l-.18 1.81a4.795 4.795 0 0 0-1.635.946L3.17 3.65a6.493 6.493 0 0 0-1.356 2.349l1.478 1.06a4.823 4.823 0 0 0 0 1.882L1.814 10c.284.88.751 1.678 1.356 2.35l1.658-.748c.472.415 1.026.74 1.635.946l.18 1.81a6.528 6.528 0 0 0 2.714 0l.18-1.81a4.794 4.794 0 0 0 1.635-.946l1.658.747a6.493 6.493 0 0 0 1.356-2.348ZM10.3 8a2.3 2.3 0 1 1-4.6 0 2.3 2.3 0 0 1 4.6 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const GearIcon = React.memo(GearIconComponent);
