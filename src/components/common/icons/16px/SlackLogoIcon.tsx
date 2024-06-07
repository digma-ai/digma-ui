import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const SlackLogoIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#slack-logo-16px-clip-1)">
        <path
          fill="#DE1C59"
          d="M3.407 10.09c0 .916-.747 1.665-1.664 1.665A1.668 1.668 0 0 1 .08 10.09c0-.916.748-1.665 1.664-1.665h1.664v1.665Zm.838 0c0-.916.749-1.665 1.665-1.665s1.665.749 1.665 1.665v4.167c0 .916-.749 1.664-1.665 1.664a1.669 1.669 0 0 1-1.665-1.664V10.09Z"
        />
        <path
          fill="#35C5F0"
          d="M5.91 3.407a1.668 1.668 0 0 1-1.665-1.664C4.245.827 4.994.08 5.91.08s1.665.748 1.665 1.664v1.664H5.91Zm0 .838c.916 0 1.665.749 1.665 1.665S6.826 7.575 5.91 7.575H1.743A1.668 1.668 0 0 1 .08 5.91c0-.916.748-1.665 1.664-1.665H5.91Z"
        />
        <path
          fill="#2EB57D"
          d="M12.593 5.91c0-.916.747-1.665 1.664-1.665.916 0 1.664.749 1.664 1.665s-.748 1.665-1.664 1.665h-1.664V5.91Zm-.838 0a1.67 1.67 0 0 1-1.665 1.665A1.669 1.669 0 0 1 8.425 5.91V1.743C8.425.827 9.174.08 10.09.08s1.665.748 1.665 1.664V5.91Z"
        />
        <path
          fill="#EBB02E"
          d="M10.09 12.593c.916 0 1.665.747 1.665 1.664 0 .916-.749 1.664-1.665 1.664a1.669 1.669 0 0 1-1.665-1.664v-1.664h1.665Zm0-.838a1.669 1.669 0 0 1-1.665-1.665 1.67 1.67 0 0 1 1.665-1.665h4.167c.916 0 1.664.749 1.664 1.665s-.748 1.665-1.664 1.665H10.09Z"
        />
      </g>
      <defs>
        <clipPath id="slack-logo-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SlackLogoIcon = React.memo(SlackLogoIconComponent);
