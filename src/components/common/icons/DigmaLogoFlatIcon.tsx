import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const DigmaLogoFlatIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        fill={color}
        d="M18.29 10.35c-.11-1.88-4.3-5.97-4.98-6.6-.68-.65-1.81-2.3-2.14-2.27-.36.03.2 3.34.24 5.7.04 2.36-.48 3.18-.66 3.13-.18-.04-.8-.13-.8-.13l-.8.13c-.17.05-.7-.77-.65-3.13.04-2.37.6-5.67.24-5.7-.33-.02-1.47 1.61-2.15 2.26-.68.65-4.86 4.72-4.97 6.6-.08 1.5.5 1.93 1.76 2.52 1.26.6 1.66.78 1.57 1.11-.1.33-.9.46-.95 1.27-.05.8.14 2.08 2.36 3.04 2.22.97 2.96 1.24 3.6 1.24.63 0 1.37-.27 3.58-1.24 2.22-.97 2.32-2.53 2.29-3.33-.04-.8-.77-.65-.86-.98-.1-.33.3-.5 1.57-1.1 1.26-.6 1.83-1.03 1.75-2.52Zm-8.56 2.23Zm-5.74-.04v-.2.2Z"
      />
      <path
        fill={color}
        d="M6.86 15.46a2.87 2.87 0 0 1-2.87-2.87v-.02a2.88 2.88 0 0 0 2.87 2.89Zm3.38-2.88Zm5.75-.04-.01-.2v.2Zm-2.87 2.92a2.87 2.87 0 0 0 2.87-2.87v-.02a2.88 2.88 0 0 1-2.87 2.89Z"
      />
    </svg>
  );
};

export const DigmaLogoFlatIcon = React.memo(DigmaLogoFlatIconComponent);
