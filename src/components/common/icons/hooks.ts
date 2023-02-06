import { useMemo } from "react";
import { useTheme } from "styled-components";
import { IconProps } from "./types";

const DEFAULT_ICON_SIZE = 12;

export const useIconProps = (props: IconProps): IconProps => {
  const theme = useTheme();
  const defaultColor = theme.mode === "light" ? "#828797" : "#7c7c94";
  const color: string = useMemo(
    () => props.color || defaultColor,
    [props.color, defaultColor]
  );
  const size: number = useMemo(
    () => props.size || DEFAULT_ICON_SIZE,
    [props.size]
  );
  return { color, size };
};
