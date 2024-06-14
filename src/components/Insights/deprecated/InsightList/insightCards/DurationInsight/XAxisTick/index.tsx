import { Text } from "recharts";
import { DefaultTheme, useTheme } from "styled-components";
import { DIVIDER, LABEL_HEIGHT } from "../constants";
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

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const XAxisTick = (props: XAxisTickProps) => {
  const theme = useTheme();
  const tickLabelColor = getTickLabelColor(theme);

  const tick = props.ticks[props.payload.value];
  const textAnchor = tick.textAnchor ?? props.textAnchor;

  const labels = tick.value.split(DIVIDER);

  // Source: https://github.com/recharts/recharts/blob/d6aa41f2d5ade9bd61a7bbdc1cfed07438049122/src/cartesian/CartesianAxis.tsx#L241C5-L241C5
  return (
    <>
      {labels.map((text, i) => (
        <Text
          {...props}
          key={text}
          fill={tickLabelColor}
          textAnchor={textAnchor}
          y={props.y + i * LABEL_HEIGHT}
          className={"recharts-cartesian-axis-tick-value"}
        >
          {text}
        </Text>
      ))}
    </>
  );
};
