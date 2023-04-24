import React from "react";
import { ThemeableIconProps } from "./types";

interface CloudDownloadIconProps extends ThemeableIconProps {
  height?: number;
}

const CloudDownloadIconComponent = (props: CloudDownloadIconProps) => {
  const height = props.height || 40;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      fill="none"
      viewBox="0 0 52 43"
    >
      <path
        fill={props.themeKind === "light" ? "#7891d0" : "#353f6f"}
        d="M39.6575 37.6079H11.8714C5.8769 37.6079 1 32.6611 1 26.5807c0-6.0804 4.8769-11.0272 10.8714-11.0272h1.9767a13.4581 13.4581 0 0 1 4.8446-5.4098 13.1583 13.1583 0 0 1 7.0717-2.0636c6.9522 0 12.7468 5.4535 13.2861 12.4557h.607c4.6448 0 8.4237 3.8293 8.4237 8.5361 0 4.7068-3.7789 8.536-8.4237 8.536Z"
      />
      <path
        fill="#4F5DA3"
        d="M41.7371 35.5279H13.9509c-5.9944 0-10.8713-4.9468-10.8713-11.0273 0-6.0804 4.8769-11.0272 10.8713-11.0272h1.9768a13.4582 13.4582 0 0 1 4.8446-5.4098A13.1584 13.1584 0 0 1 27.844 6c6.9522 0 12.7468 5.4535 13.2861 12.4558h.607c4.6448 0 8.4237 3.8292 8.4237 8.536 0 4.7068-3.7789 8.5361-8.4237 8.5361Z"
      />
      <path
        fill="#E6E6E6"
        d="M26.4383 17.4583a5.7292 5.7292 0 1 0 5.7293 5.7292 5.7357 5.7357 0 0 0-5.7293-5.7292Zm2.0746 6.4818-1.7628 1.7628a.4418.4418 0 0 1-.3118.1293.4405.4405 0 0 1-.3118-.1293l-1.7629-1.7628a.441.441 0 0 1 .6236-.6237l1.0104 1.0109V20.984a.441.441 0 0 1 .129-.3117.441.441 0 0 1 .6233 0 .4407.4407 0 0 1 .1291.3117v3.3433l1.0103-1.0109a.441.441 0 0 1 .6236.6237Z"
      />
    </svg>
  );
};

export const CloudDownloadIcon = React.memo(CloudDownloadIconComponent);
