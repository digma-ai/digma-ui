import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const DigmaLogoFlatIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 23"
    >
      <linearGradient id="grad">
        <stop offset="0%" stopColor="#6165b2" />
        <stop offset="100%" stopColor="#2e2d9d" />
      </linearGradient>
      <path
        fill={props.color || "url(#grad)"}
        d="M20.116 11.33c-.118-2.066-4.725-6.558-5.472-7.265-.747-.707-1.996-2.51-2.362-2.485-.386.035.223 3.668.27 6.266.047 2.599-.529 3.497-.728 3.448-.2-.049-.876-.148-.876-.148s-.677.098-.875.148c-.198.05-.778-.848-.727-3.448.052-2.6.656-6.23.268-6.266C9.25 1.552 8 3.352 7.25 4.065c-.748.713-5.35 5.194-5.469 7.266-.093 1.639.54 2.111 1.932 2.77 1.39.658 1.826.856 1.727 1.216-.099.36-.995.51-1.045 1.393-.05.883.162 2.287 2.603 3.348 2.44 1.062 3.248 1.362 3.95 1.362.7 0 1.508-.296 3.95-1.362 2.44-1.066 2.552-2.778 2.51-3.66-.044-.881-.845-.72-.944-1.08-.1-.36.335-.559 1.726-1.217 1.39-.659 2.018-1.131 1.925-2.77Z"
      />
    </svg>
  );
};

export const DigmaLogoFlatIcon = React.memo(DigmaLogoFlatIconComponent);
