import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const RingingBellIconComponent = (props: IconProps) => {
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
        d="M14 4.444a.5.5 0 0 1-.674-.214 5.883 5.883 0 0 0-2.091-2.307.5.5 0 1 1 .534-.846 6.966 6.966 0 0 1 2.445 2.693.5.5 0 0 1-.214.674ZM2.232 4.5a.5.5 0 0 0 .444-.27 5.883 5.883 0 0 1 2.09-2.307.5.5 0 0 0-.533-.846A6.966 6.966 0 0 0 1.788 3.77a.5.5 0 0 0 .444.73Zm11.631 6.496A1 1 0 0 1 13 12.5h-2.55a2.5 2.5 0 0 1-4.9 0H3a1 1 0 0 1-.862-1.504C2.701 10.024 3 8.643 3 7a5 5 0 0 1 10 0c0 1.642.299 3.024.863 3.996ZM9.413 12.5H6.587a1.5 1.5 0 0 0 2.828 0Zm3.587-1c-.665-1.142-1-2.656-1-4.5a4 4 0 0 0-8 0c0 1.845-.336 3.359-1 4.5h10Z"
      />
    </svg>
  );
};

export const RingingBellIcon = React.memo(RingingBellIconComponent);
