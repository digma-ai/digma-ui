import { Text } from "recharts";
import { CartesianViewBox } from "recharts/types/util/types";
import { useTheme } from "styled-components";
import { isNumber } from "../../../../../../../typeGuards/isNumber";
import { isString } from "../../../../../../../typeGuards/isString";
import { DIVIDER, LABEL_HEIGHT } from "../constants";
import { ReferenceLineLabelProps } from "./types";

const LABEL_GAP = 4; // in pixels

const isTextAnchor = (
  value?: string
): value is "start" | "end" | "middle" | "inherit" | undefined =>
  ["start", "middle", "end", "inherit", undefined].includes(value);

export const ReferenceLineLabel = (props: ReferenceLineLabelProps) => {
  const theme = useTheme();
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
    : "middle";

  return (
    <g>
      {labels.map((text, i) => (
        <Text
          key={text}
          x={x}
          textAnchor={textAnchor}
          y={y + i * LABEL_HEIGHT - LABEL_GAP}
          dy={
            labels.length > 1
              ? -((labels.length - 1) * LABEL_HEIGHT)
              : undefined
          }
          fill={theme.colors.v3.stroke.secondary}
          fontSize={theme.typographies.captionOne.fontSize}
          lineHeight={LABEL_HEIGHT}
        >
          {text}
        </Text>
      ))}
    </g>
  );
};
