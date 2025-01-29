import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const SoundWaveIconComponent = (props: IconProps) => {
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
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 6.67v2M3.8 4v7.33M6.6 2v12m2.8-8.67V10m2.8-6.67V12M15 6.67v2"
      />
    </svg>
  );
};

export const SoundWaveIcon = React.memo(SoundWaveIconComponent);
