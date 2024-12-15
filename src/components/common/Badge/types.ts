import type { CSSProperties } from "react";

export interface BadgeProps {
  customStyles?: {
    main: CSSProperties;
    outline: CSSProperties;
  };
}

export interface CustomStylesProps {
  $customStyles?: CSSProperties;
}
