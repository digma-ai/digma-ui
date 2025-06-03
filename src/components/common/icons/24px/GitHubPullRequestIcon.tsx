import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const GitHubPullRequestIconComponent = (props: IconProps) => {
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
        d="M7.515 9.41v6.06m9.091 0v-3.03c0-2.143 0-3.215-.666-3.88-.665-.666-1.737-.666-3.88-.666h-.757m0 0c0-.53 1.51-1.521 1.894-1.894m-1.894 1.894c0 .53 1.51 1.521 1.894 1.894M7.515 18.5a1.515 1.515 0 1 0 0-3.03 1.515 1.515 0 0 0 0 3.03Zm0-9.09a1.515 1.515 0 1 0 0-3.031 1.515 1.515 0 0 0 0 3.03Zm9.091 9.09a1.515 1.515 0 1 0 0-3.03 1.515 1.515 0 0 0 0 3.03Z"
      />
    </svg>
  );
};

export const GitHubPullRequestIcon = React.memo(GitHubPullRequestIconComponent);
