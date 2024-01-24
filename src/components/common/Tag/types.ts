import { MemoExoticComponent } from "react";
import { IconProps } from "../icons/types";

export type TagType =
  | "highSeverity"
  | "mediumSeverity"
  | "lowSeverity"
  | "success"
  | "default";

export interface TagThemeColors {
  default: {
    text: string;
    background: string;
  };
  highSeverity: {
    text: string;
    background: string;
  };
  mediumSeverity: {
    text: string;
    background: string;
  };
  lowSeverity: {
    text: string;
    background: string;
  };
  success: {
    text: string;
    background: string;
  };
}

export interface TagProps {
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  value?: string | number;
  type?: TagType;
  title?: string;
}

export interface ContainerProps {
  $type?: TagType;
}
