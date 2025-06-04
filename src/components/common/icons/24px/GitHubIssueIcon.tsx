import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const GitHubIssueIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12a7 7 0 1 0-14 0 7 7 0 0 0 14 0Z"
      />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );
};

export const GitHubIssueIcon = React.memo(GitHubIssueIconComponent);
