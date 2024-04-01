import { Text } from "recharts";
import { CartesianViewBox } from "recharts/types/util/types";
import { isNumber } from "../../../../../../../typeGuards/isNumber";
import { isString } from "../../../../../../../typeGuards/isString";
import { DIVIDER, LABEL_HEIGHT } from "../constants";
import { ReferenceLineLabelProps } from "./types";

const isTextAnchor = (
  value?: string
): value is "start" | "end" | "middle" | "inherit" | undefined =>
  ["start", "middle", "end", "inherit", undefined].includes(value);

export const ReferenceLineLabel = (props: ReferenceLineLabelProps) => {
  const labels = isString(props.value)
    ? props.value.split(DIVIDER)
    : isNumber(props.value)
    ? [props.value]
    : undefined;

  const viewBox = props.viewBox as CartesianViewBox | undefined;
  const x = viewBox?.x;
  const y = viewBox?.y;

  if (!isNumber(x) || !isNumber(y) || !labels) {
    return null;
  }

  const textAnchor = isTextAnchor(props.textAnchor)
    ? props.textAnchor
    : undefined;

  return (
    <g>
      {labels.map((text, i) => (
        <Text
          key={text}
          x={x}
          textAnchor={textAnchor || "middle"}
          y={y + i * LABEL_HEIGHT}
          dy={labels.length > 1 ? -LABEL_HEIGHT : undefined}
        >
          {text}
        </Text>
      ))}
    </g>
  );
};
