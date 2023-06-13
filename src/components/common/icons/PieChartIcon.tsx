import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const PieChartIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        d="M11.722 3.005a1.231 1.231 0 0 0-1.338 1.226v3.128a1.22 1.22 0 0 0 1.02 1.213 2.462 2.462 0 1 1-2.866 2.557c-.032-.632.098-1.154.384-1.558a1.22 1.22 0 0 0-.13-1.575L6.668 5.822a1.23 1.23 0 0 0-1.818.084 7.97 7.97 0 0 0 .534 10.79A7.942 7.942 0 0 0 10.999 19h.115a8.023 8.023 0 0 0 7.885-7.886c.058-4.177-3.139-7.739-7.277-8.11ZM5.793 6.688l2.124 2.168v.005a3.33 3.33 0 0 0-.576 1.524H4.258a6.702 6.702 0 0 1 1.535-3.697ZM4.26 11.615h3.1a3.692 3.692 0 0 0 3.025 3.027v3.1a6.77 6.77 0 0 1-6.125-6.127Zm11.52 4.165a6.727 6.727 0 0 1-4.164 1.96v-3.098a3.693 3.693 0 0 0 0-7.283V4.23c3.501.314 6.205 3.329 6.154 6.865a6.727 6.727 0 0 1-1.99 4.684Z"
      />
    </svg>
  );
};

export const PieChartIcon = React.memo(PieChartIconComponent);
