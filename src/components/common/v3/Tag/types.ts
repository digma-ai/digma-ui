import { MemoExoticComponent } from "react";
import { IconProps } from "../../icons/types";

export type TagType =
  | "highSeverity"
  | "mediumSeverity"
  | "lowSeverity"
  | "success"
  | "highlight"
  | "default";

export interface TagProps {
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  value?: string | number;
  type?: TagType;
  title?: string;
}

export interface ContainerProps {
  $type?: TagType;
}
