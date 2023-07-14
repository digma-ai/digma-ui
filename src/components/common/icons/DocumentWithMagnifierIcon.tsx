import React from "react";
import { useIconProps } from "./hooks";
import { ThemeableIconProps } from "./types";

const DocumentWithMagnifierIconComponent = (props: ThemeableIconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 72 72"
    >
      <g filter="url(#documentWithMagnifier-filter-1)">
        <path
          fill={props.themeKind === "light" ? "#f1f5fa" : "#83858e"}
          d="M52.36 59.417H19.64a4.185 4.185 0 0 1-2.958-1.23 4.205 4.205 0 0 1-1.227-2.965V16.703a4.205 4.205 0 0 1 1.227-2.965 4.185 4.185 0 0 1 2.958-1.23h30.44l6.465 5.165v37.55a4.205 4.205 0 0 1-1.227 2.964 4.185 4.185 0 0 1-2.958 1.23Z"
        />
      </g>
      <path
        fill={props.themeKind === "light" ? "#f1f5fa" : "#83858e"}
        d="M19.64 13.716a2.98 2.98 0 0 0-2.107.876 2.995 2.995 0 0 0-.874 2.111v38.52c.001.791.315 1.55.874 2.11a2.98 2.98 0 0 0 2.107.877h32.72a2.98 2.98 0 0 0 2.107-.876c.558-.56.873-1.32.873-2.112V18.255l-5.68-4.54H19.64Z"
      />
      <path
        fill={props.themeKind === "light" ? "#cad2db" : "#65666b"}
        d="M56.282 17.639h-5.064a1.392 1.392 0 0 1-1.394-1.397v-3.75a.087.087 0 0 1 .097-.086.087.087 0 0 1 .044.018l6.371 5.06a.087.087 0 0 1-.003.139.087.087 0 0 1-.05.016Z"
      />
      <path
        fill={props.themeKind === "light" ? "#a5afd4" : "#49494d"}
        d="M45.996 24.79H31.099a.696.696 0 0 1-.697-.7.7.7 0 0 1 .697-.698h14.897a.696.696 0 0 1 .697.699.7.7 0 0 1-.697.698Zm2.874 2.357H31.1a.697.697 0 0 1-.696-.698.7.7 0 0 1 .696-.699h17.77a.697.697 0 0 1 .645.966.7.7 0 0 1-.645.431Zm-2.874 6.811H31.1a.696.696 0 0 0-.697.699.7.7 0 0 0 .697.698h14.896a.696.696 0 0 0 .697-.698.7.7 0 0 0-.697-.699Zm2.875 2.358H31.1a.696.696 0 0 0-.697.698.7.7 0 0 0 .697.699h17.77a.696.696 0 0 0 .697-.699.7.7 0 0 0-.697-.698Zm-2.875 9.606H31.099a.696.696 0 0 1-.697-.699.7.7 0 0 1 .697-.699h14.897a.696.696 0 0 1 .697.699.7.7 0 0 1-.697.699Zm2.874 2.358H31.1a.696.696 0 0 1-.696-.7.7.7 0 0 1 .696-.698h17.77a.697.697 0 0 1 .645.967.698.698 0 0 1-.645.43ZM24.895 27.739a2.466 2.466 0 0 0 2.464-2.47 2.466 2.466 0 0 0-2.464-2.469 2.466 2.466 0 0 0-2.463 2.47 2.466 2.466 0 0 0 2.463 2.469Zm2.717 8.097a2.475 2.475 0 0 1-1.52 2.281 2.458 2.458 0 0 1-3.237-1.382 2.475 2.475 0 0 1 .575-2.669 2.461 2.461 0 0 1 4.182 1.77Zm-2.717 13.035a2.466 2.466 0 0 0 2.464-2.469 2.466 2.466 0 0 0-2.464-2.469 2.466 2.466 0 0 0-2.463 2.47 2.466 2.466 0 0 0 2.463 2.468Z"
      />
      <path
        fill={props.themeKind === "light" ? "#4d668a" : "#dadada"}
        d="M63.294 50.961a1.046 1.046 0 0 1-1.438.348L49.65 43.87a1.045 1.045 0 1 1 1.09-1.785l12.204 7.44a1.046 1.046 0 0 1 .349 1.437Z"
      />
      <path
        fill={props.themeKind === "light" ? "#4d668a" : "#dadada"}
        d="M51.13 43.535a8.406 8.406 0 1 1-2.8-11.553 8.415 8.415 0 0 1 2.8 11.553Zm-12.56-7.66a6.304 6.304 0 0 0 10.021 7.552 6.303 6.303 0 0 0-6.123-10.393 6.312 6.312 0 0 0-3.899 2.841Z"
      />
      <defs>
        <filter
          id="documentWithMagnifier-filter-1"
          width="49.091"
          height="54.909"
          x="12.455"
          y="9.508"
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
            result="effect1_dropShadow_3251_138521"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3251_138521"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const DocumentWithMagnifierIcon = React.memo(
  DocumentWithMagnifierIconComponent
);
