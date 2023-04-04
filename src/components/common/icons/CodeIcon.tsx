import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CodeIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        fill={color}
        d="M3.24 4.413 1.336 6 3.24 7.587a.375.375 0 1 1-.48.576L.51 6.288a.375.375 0 0 1 0-.576l2.25-1.875a.375.375 0 0 1 .48.576Zm8.25 1.299L9.24 3.837a.375.375 0 1 0-.48.576L10.664 6 8.76 7.587a.375.375 0 1 0 .48.576l2.25-1.875a.375.375 0 0 0 0-.576Zm-3.862-4.19a.375.375 0 0 0-.48.225l-3 8.25a.375.375 0 1 0 .705.256l3-8.25a.375.375 0 0 0-.225-.48Z"
      />
    </svg>
  );
};

export const CodeIcon = React.memo(CodeIconComponent);
