import React from "react";
import { useIconProps } from "./hooks";
import { ThemeableIconProps } from "./types";

const PlayButtonWithCursorIconComponent = (props: ThemeableIconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="50"
        fill={props.themeKind === "light" ? "#d0d6eb" : "#323334"}
      />
      <g filter="url(#play-button-with-cursor-filter-1)">
        <path
          fill={props.themeKind === "light" ? "#fff" : "#868a91"}
          d="M76.487 47.618c1.834 1.059 1.834 3.705 0 4.764L38.82 74.129c-1.834 1.059-4.125-.264-4.125-2.381V28.252c0-2.117 2.291-3.44 4.125-2.381l37.668 21.747Z"
        />
      </g>
      <g filter="url(#play-button-with-cursor-filter-2)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m60.204 53.179 4.769 18.265 3.374-5.759 5.792 6.617s1.116.06 1.523-.397c.406-.457.724-1.247.363-1.72-1.702-2.24-5.792-6.618-5.792-6.618l5.327-1.39-15.356-8.998Z"
          clipRule="evenodd"
        />
      </g>

      <path
        stroke={props.themeKind === "light" ? "#788ca9" : "#dfe1e5"}
        strokeWidth="1.385"
        d={
          props.themeKind === "light"
            ? "m59.323 49.86-1.828-6.824m3.601 7.006 3.532-6.118m-1.974 9.009 6.118-3.532"
            : "m59.323 49.86-1.828-6.824m3.601 7.006 3.532-6.118m-1.866 7.517 6.118-3.533"
        }
      />
      <defs>
        <filter
          id="play-button-with-cursor-filter-1"
          width="51.168"
          height="57.004"
          x="31.694"
          y="22.498"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2802_726"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2802_726"
            result="shape"
          />
        </filter>
        <filter
          id="play-button-with-cursor-filter-2"
          width="21.529"
          height="24.677"
          x="57.429"
          y="51.945"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1.542" />
          <feGaussianBlur stdDeviation="1.387" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2802_726"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2802_726"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const PlayButtonWithCursorIcon = React.memo(
  PlayButtonWithCursorIconComponent
);
