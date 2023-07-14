import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const SortIconComponent = (props: IconProps) => {
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
        d="M6 6.75a.375.375 0 0 0-.375-.375H2.25a.375.375 0 1 0 0 .75h3.375A.375.375 0 0 0 6 6.75ZM2.25 9.375h6.375a.375.375 0 0 1 0 .75H2.25a.375.375 0 1 1 0-.75Zm2.625-5.25H2.25a.375.375 0 1 1 0-.75h2.625a.375.375 0 1 1 0 .75Zm5.89 1.016a.375.375 0 0 1-.53 0L9 3.905V7.5a.375.375 0 0 1-.75 0V3.905L7.015 5.141a.375.375 0 0 1-.53-.531L8.36 2.735a.375.375 0 0 1 .53 0l1.875 1.875a.375.375 0 0 1 0 .53Z"
      />
    </svg>
  );
};

export const SortIcon = React.memo(SortIconComponent);
