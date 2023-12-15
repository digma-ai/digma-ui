import * as s from "./styles";
import { IconTagProps } from "./types";

export const IconTag = (props: IconTagProps) => {
  const size = props.size || "small";
  const iconSize = size === "large" ? 16 : 12;

  return (
    <s.Container $size={size}>
      <props.icon size={iconSize} color={"currentColor"} />
    </s.Container>
  );
};
