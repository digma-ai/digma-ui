import React from "react";
import { ThemeableIconProps } from "./types";

interface InfininiteLoopProps extends ThemeableIconProps {
  height?: number;
}

const InfiniteLoopIconComponent = (props: InfininiteLoopProps) => {
  const height = props.height || 44;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      fill="none"
      viewBox="0 0 57 44"
    >
      <path
        fill="#353F6E"
        d="M28.475 25.57c-4.372 4.41-8.917 9.254-15.81 9.203C5.515 34.721.447 29.284.5 21.794.549 14.914 6.036 8.946 13.527 9c6.297.047 10.943 5.219 14.997 9.43 4.372-4.41 8.917-9.253 15.81-9.202 7.234.052 12.217 5.489 12.164 12.979-.048 6.88-5.537 12.849-13.027 12.793-6.298-.046-10.943-5.218-14.998-9.43h.002Zm-3.38-3.595c-3.297-3.16-6.754-7.714-11.691-7.75-4.255-.03-7.514 3.516-7.543 7.61-.031 4.44 3.01 7.686 7.18 7.717 4.85.035 8.796-4.204 12.054-7.576v-.001Zm26.043.191c.032-4.44-3.01-7.686-7.18-7.717-4.85-.035-8.795 4.203-12.054 7.575 3.297 3.16 6.755 7.715 11.691 7.75 4.256.031 7.514-3.515 7.543-7.61v.002Z"
      />
      <path
        fill="#4F5DA3"
        d="M.5 21.794c-.007.807.059 1.586.168 2.341l2.567 1.697 2.908-1.697a8.881 8.881 0 0 1-.282-2.3c.029-4.094 3.288-7.64 7.543-7.61a8.09 8.09 0 0 1 2.074.297l-1.732-2.766 1.732-2.562A11.389 11.389 0 0 0 13.527 9C6.037 8.946.549 14.914.5 21.794Zm56 .413c0-.108-.01-.21-.011-.318l-2.83 1.741-2.53-1.741c.001.092.01.184.01.278-.03 4.093-3.288 7.64-7.543 7.609-1.064-.008-2.054-.235-2.993-.603l-2.036 2.134 2.036 3.297c.92.24 1.872.389 2.872.397 7.488.055 12.977-5.914 13.027-12.794H56.5Zm-24.596-.182c1.785-1.848 3.778-3.953 6.013-5.475l2.089-3.768-2.117-2.038c-3.593 1.768-6.518 4.815-9.364 7.685l-3.43 3.545c-2.382 2.466-5.135 5.39-8.338 6.772l1.832 1.89-1.832 3.546c4.72-1.41 8.275-5.14 11.718-8.612l3.43-3.545Z"
      />
    </svg>
  );
};

export const InfiniteLoopIcon = React.memo(InfiniteLoopIconComponent);