import { useMemo } from "react";
import { IconProps } from "./types";

const DEFAULT_ICON_SIZE = 12;
// TODO: use theme
const DEFAULT_COLOR = "#dadada";

export const useIconProps = (props: IconProps): IconProps => {
  const color: string = useMemo(
    () => props.color || DEFAULT_COLOR,
    [props.color]
  );
  const size: number = useMemo(
    () => props.size || DEFAULT_ICON_SIZE,
    [props.size]
  );
  return { color, size };
};
