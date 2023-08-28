import { Text } from "recharts";
import { XAxisTickProps } from "./types";

export const XAxisTick = (props: XAxisTickProps) => {
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
      textAnchor={textAnchor}
      className={"recharts-cartesian-axis-tick-value"}
    >
      {tick.value}
    </Text>
  );
};
