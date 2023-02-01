import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const SnailIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        d="M3.92 16.2h10.52c.98 0 1.78-.8 1.78-1.79v-.39c0-.77.63-1.4 1.4-1.4v0c.54 0 .98-.44.98-.98v-.2c0-.66-.54-1.2-1.2-1.2v0c-1.17 0-2.22.76-2.6 1.87l-.54 1.62c0 .02-.02.01-.02 0v-2.6a4.85 4.85 0 0 0-4.86-4.85h-.3a3.97 3.97 0 0 0-3.97 3.96v.67a3.3 3.3 0 0 0 3.3 3.3h1c1.13 0 2.05-.91 2.05-2.05v-1.02c0-1.15-.93-2.09-2.08-2.09h-.1c-.77 0-1.4.63-1.4 1.4v0c0 .76.63 1.38 1.4 1.38h.2"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        d="M19 7.86c-.53-.13-1.67.16-1.98 2.38m.39-3.96c-.53-.14-1.98 1.58-1.59 4.36"
      />
    </svg>
  );
};

export const SnailIcon = React.memo(SnailIconComponent);
