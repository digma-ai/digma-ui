import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const SQLDatabaseIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 5.8c0 .994-2.239 1.8-5 1.8s-5-.806-5-1.8m10 0c0-.994-2.239-1.8-5-1.8s-5 .806-5 1.8m10 0V9M6 5.8v6M16 9c0 .996-2.222 1.8-5 1.8S6 9.996 6 9m10 0v5.2M6 15.933c.261.198.578.305.904.306.542 0 1.025-.184 1.025-.796 0-.98-1.929-.55-1.929-1.469 0-.49.362-.795.904-.795.326 0 .643.108.904.306m5.585-.306v3.078H15.5m-5-.185c.71 0 1.286-.648 1.286-1.447S11.21 13.18 10.5 13.18c-.71 0-1.286.647-1.286 1.446 0 .799.576 1.447 1.286 1.447Zm.322-.965L11.5 16.5"
      />
    </svg>
  );
};

export const SQLDatabaseIcon = React.memo(SQLDatabaseIconComponent);
