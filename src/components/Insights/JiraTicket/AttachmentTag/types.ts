import { ComponentType } from "react";
import { IconProps } from "../../../common/icons/types";

export interface AttachmentTagThemeColors {
  background: string;
  border: string;
  icon: {
    background: string;
    stroke: string;
  };
  text: string;
}

export interface AttachmentTagProps {
  icon: ComponentType<IconProps>;
  text: string;
}
