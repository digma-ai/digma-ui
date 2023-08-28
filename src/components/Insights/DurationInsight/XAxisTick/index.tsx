import { Text } from "recharts";
import { DefaultTheme, useTheme } from "styled-components";
import { XAxisTickProps } from "./types";

const getTickLabelColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

export const XAxisTick = (props: XAxisTickProps) => {
  const theme = useTheme();
  const tickLabelColor = getTickLabelColor(theme);

  let textAnchor = props.textAnchor;

  const tick = props.ticks[props.payload.value];

  switch (tick.role) {
    case "min":
      textAnchor = "end";
      break;
    case "max":
      textAnchor = "start";
      break;
  }

  // Source: https://github.com/recharts/recharts/blob/d6aa41f2d5ade9bd61a7bbdc1cfed07438049122/src/cartesian/CartesianAxis.tsx#L241C5-L241C5
  return (
    <Text
      {...props}
      fill={tickLabelColor}
      textAnchor={textAnchor}
      className={"recharts-cartesian-axis-tick-value"}
    >
      {tick.value}
    </Text>
  );
};
