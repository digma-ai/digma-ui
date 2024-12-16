import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PetalsIconComponent = (props: IconProps) => {
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
        d="M7.25 2v2a.75.75 0 0 0 1.5 0V2a.75.75 0 0 0-1.5 0ZM5.172 5.922a.75.75 0 0 1-.53-.22L3.226 4.287a.751.751 0 1 1 1.062-1.062l1.413 1.416a.75.75 0 0 1-.53 1.28ZM2 7.25h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5Zm2.641 3.048a.751.751 0 0 1 1.063 1.063l-1.415 1.414a.751.751 0 1 1-1.062-1.063l1.414-1.414ZM8 11.25a.75.75 0 0 1 .75.75v2a.75.75 0 1 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm3.359-.952 1.414 1.415a.751.751 0 1 1-1.062 1.062l-1.415-1.414a.752.752 0 0 1 1.063-1.063ZM11.25 8a.75.75 0 0 1 .75-.75h2a.75.75 0 1 1 0 1.5h-2a.75.75 0 0 1-.75-.75Zm.463-4.773a.752.752 0 0 1 1.062 1.062l-1.416 1.413a.751.751 0 1 1-1.063-1.063l1.417-1.412Z"
      />
    </svg>
  );
};

export const PetalsIcon = React.memo(PetalsIconComponent);
