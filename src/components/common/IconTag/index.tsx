import * as s from "./styles";
import type { IconTagProps } from "./types";

export const IconTag = ({ size = "small", icon: Icon }: IconTagProps) => {
  const iconSize = size === "large" ? 16 : 12;

  return (
    <s.Container $size={size}>
      <Icon size={iconSize} color={"currentColor"} />
    </s.Container>
  );
};
