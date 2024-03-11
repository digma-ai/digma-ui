import { Text } from "recharts";
import { useTheme } from "styled-components";
import { DIVIDER, LABEL_HEIGHT } from "../constants";
import { XAxisTickProps } from "./types";

export const XAxisTick = (props: XAxisTickProps) => {
  const theme = useTheme();

  const tick = props.ticks[props.payload.value];
  const textAnchor = tick.textAnchor || props.textAnchor;

  const labels = tick.value.split(DIVIDER);

  // Source: https://github.com/recharts/recharts/blob/d6aa41f2d5ade9bd61a7bbdc1cfed07438049122/src/cartesian/CartesianAxis.tsx#L241C5-L241C5
  return (
    <>
      {labels.map((text, i) => (
        <Text
          {...props}
          key={text}
          fill={theme.colors.v3.stroke.secondary}
          fontSize={theme.typographies.captionOne.fontSize}
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
