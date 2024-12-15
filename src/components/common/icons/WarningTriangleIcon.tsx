import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const WarningTriangleIconComponent = (props: IconProps) => {
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
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5.142 2.259-3.775 6.52-.01.017a6.027 6.027 0 0 0-.244.449c-.062.132-.13.315-.109.527.028.27.17.516.39.676a1 1 0 0 0 .51.17c.143.013.32.013.51.013h7.591c.192 0 .368 0 .51-.013a.995.995 0 0 0 .511-.17.959.959 0 0 0 .39-.676 1.003 1.003 0 0 0-.108-.527 6.036 6.036 0 0 0-.245-.449l-.01-.017-3.775-6.52-.01-.018a6.005 6.005 0 0 0-.266-.434 1.002 1.002 0 0 0-.402-.356.959.959 0 0 0-.78 0 1.002 1.002 0 0 0-.402.356c-.082.117-.17.27-.266.434l-.01.018ZM6.21 4.854v1.835m0 1.836h.005"
      />
    </svg>
  );
};

export const WarningTriangleIcon = React.memo(WarningTriangleIconComponent);
