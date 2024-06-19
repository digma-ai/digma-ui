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

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const ReferenceLineLabel = ({
  value,
  viewBox: labelViewBox,
  textAnchor: labelTextAnchor
}: ReferenceLineLabelProps) => {
  const labels = isString(value)
    ? value.split(DIVIDER)
    : isNumber(value)
    ? [value]
    : undefined;

  const viewBox = labelViewBox as CartesianViewBox | undefined;
  const x = viewBox?.x;
  const y = viewBox?.y;

  if (!isNumber(x) || !isNumber(y) || !labels) {
    return null;
  }

  const textAnchor = isTextAnchor(labelTextAnchor) ? labelTextAnchor : "middle";

  return (
    <g>
      {labels.map((text, i) => (
        <Text
          key={text}
          x={x}
          textAnchor={textAnchor}
          y={y + i * LABEL_HEIGHT}
          dy={labels.length > 1 ? -LABEL_HEIGHT : undefined}
        >
          {text}
        </Text>
      ))}
    </g>
  );
};
