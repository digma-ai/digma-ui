import { DEFAULT_ICON_SIZE } from "../icons/hooks";
import * as s from "./styles";
import { CircleLoaderProps } from "./types";

export const CircleLoader = (props: CircleLoaderProps) => {
  const size = props.size || DEFAULT_ICON_SIZE;

  return (
    <s.OuterCircle
      size={size}
      startColor={props.colors.start}
      endColor={props.colors.end}
    >
      <s.InnerCircle background={props.colors.background} />
    </s.OuterCircle>
  );
};
