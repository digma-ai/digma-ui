import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ClearIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        stroke="#828599"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M.67 10.882c-.092-.812 2.304-2.203 4.259-4.876.966-1.322 2.208-1.406 4.906.411 1.342.756 2.696 3.95-.41 7.18C8.355 14.71.76 11.692.67 10.881Z"
      />
      <path
        stroke="#828599"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M3.102 12.328s.314.174.898-.994m2 1.999s.791-.398 1.333-1.333"
      />
      <path
        stroke="#828599"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M4.37 6.627s3.075 2.156 6.807 2.88"
      />
      <path
        fill="#828599"
        d="M11.768 1.581a.5.5 0 1 0-.87-.495l.87.495ZM9.276 5.956l2.492-4.375-.87-.495-2.491 4.375.869.495Z"
      />
    </svg>
  );
};

export const ClearIcon = React.memo(ClearIconComponent);
