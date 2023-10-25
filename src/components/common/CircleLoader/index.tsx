import { DefaultTheme, useTheme } from "styled-components";
import { DEFAULT_ICON_SIZE } from "../icons/hooks";
import * as s from "./styles";
import { CircleLoaderColors, CircleLoaderProps } from "./types";

const getDefaultColors = (theme: DefaultTheme): CircleLoaderColors => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#fff"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#2b2d30"
      };
  }
};

export const CircleLoader = (props: CircleLoaderProps) => {
  const size = props.size || DEFAULT_ICON_SIZE;
  const theme = useTheme();

  const colors = props.colors || getDefaultColors(theme);

  return (
    <s.OuterCircle
      $size={size}
      $startColor={colors.start}
      $endColor={colors.end}
    >
      <s.InnerCircle $background={colors.background} />
    </s.OuterCircle>
  );
};
