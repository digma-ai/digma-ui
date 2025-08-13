import { format } from "date-fns";
import type { SVGProps } from "react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useTheme } from "styled-components";
import { useGetErrorTimeseriesQuery } from "../../../../redux/services/digma";
import type {
  ErrorsTimeseriesRecord,
  GetErrorTimeseriesPayload
} from "../../../../redux/services/types";
import { isNumber } from "../../../../typeGuards/isNumber";
import { measureTextWidth } from "../../../../utils/measureTextWidth";
import { HistogramIcon } from "../../../common/icons/30px/HistogramIcon";
import * as s from "./styles";
import type {
  HorizontalCoordinatesGeneratorProps,
  OccurrenceChartProps
} from "./types";

const MAX_BAR_WIDTH = 32;
const Y_AXIS_PADDING = 4;

export const OccurrenceChart = ({
  errorId,
  spanCodeObjectId,
  service,
  environmentId
}: OccurrenceChartProps) => {
  const theme = useTheme();

  const tickLabelStyles: SVGProps<SVGTextElement> = {
    fill: theme.colors.v3.text.secondary,
    opacity: 0.5
  };

  const YAxisTickLabelStyles: SVGProps<SVGTextElement> = {
    ...tickLabelStyles,
    fontSize: theme.typographies.footNote.fontSize,
    fontWeight: theme.typographies.footNote.fontWeight.regular
  };

  const XAxisTickLabelStyles: SVGProps<SVGTextElement> = {
    ...tickLabelStyles,
    fontSize: theme.typographies.captionOne.fontSize,
    fontWeight: theme.typographies.captionOne.fontWeight.regular
  };

  const payload: GetErrorTimeseriesPayload = useMemo(
    () => ({
      id: errorId,
      spanCodeObjectId,
      service,
      environment: environmentId ?? ""
    }),
    [errorId, spanCodeObjectId, service, environmentId]
  );

  const { data } = useGetErrorTimeseriesQuery(payload, {
    skip: !environmentId
  });

  const maxOccurrence = useMemo(
    () =>
      data?.dailyOccurrence.reduce((acc, cur) => {
        return acc >= cur.value ? acc : cur.value;
      }, 0) ?? 0,
    [data]
  );

  const maxYAxisTickDigitsNumber = useMemo(
    () => maxOccurrence.toString().length + 1,
    [maxOccurrence]
  );

  const YAxisWidth = useMemo(
    () =>
      measureTextWidth("0".repeat(maxYAxisTickDigitsNumber), {
        fontSize: theme.typographies.footNote.fontSize,
        fontWeight: theme.typographies.footNote.fontWeight.regular,
        fontFamily: theme.mainFont
      }),
    [maxYAxisTickDigitsNumber, theme]
  );

  return (
    <s.HistogramContainer>
      <s.HistogramHeader>
        <s.HistogramTitle>Occurrence over time</s.HistogramTitle>
      </s.HistogramHeader>
      {data?.dailyOccurrence ? (
        data.dailyOccurrence.length > 0 ? (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={data.dailyOccurrence} maxBarSize={MAX_BAR_WIDTH}>
              <CartesianGrid
                vertical={false}
                stroke={theme.colors.v3.stroke.tertiary}
                horizontalCoordinatesGenerator={({
                  offset
                }: HorizontalCoordinatesGeneratorProps) => {
                  if (!offset.height || !isNumber(offset.top)) {
                    return [];
                  }
                  let linesCount = 4;
                  const lines = [];
                  const maxTickTopOffset = offset.height + offset.top;
                  const interval = Math.floor(offset.height / linesCount);
                  let top = maxTickTopOffset - interval;

                  while (linesCount) {
                    lines.push(top);
                    linesCount--;
                    top -= interval;
                  }

                  return lines;
                }}
              />
              <XAxis
                dataKey={"date"}
                axisLine={{ stroke: theme.colors.v3.stroke.tertiary }}
                tickLine={false}
                tick={XAxisTickLabelStyles}
                tickFormatter={(x: string) => format(x, "MM/dd")}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={YAxisTickLabelStyles}
                allowDecimals={false}
                width={YAxisWidth + Y_AXIS_PADDING}
              />
              <Bar
                isAnimationActive={false}
                dataKey={"value"}
                fill={theme.colors.v3.status.backgroundHigh}
              />
              <Tooltip
                cursor={false}
                content={(x) => {
                  const payload = x.payload;

                  if (!payload || payload.length === 0) {
                    return;
                  }

                  const { date, value } = payload[0]
                    .payload as ErrorsTimeseriesRecord;

                  return (
                    <s.TooltipContainer>
                      <span>Occurrences: {value}</span>
                      <span>{format(date, "MM/dd/y")}</span>
                    </s.TooltipContainer>
                  );
                }}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <s.EmptyStateContainer>
            <s.EmptyStateIconContainer>
              <HistogramIcon size={30} color={"currentColor"} />
            </s.EmptyStateIconContainer>
            <span>No data</span>
          </s.EmptyStateContainer>
        )
      ) : (
        <s.EmptyStateContainer>
          <s.EmptyStateIconContainer>
            <s.Spinner size={32} />
          </s.EmptyStateIconContainer>
          <span>Loading</span>
        </s.EmptyStateContainer>
      )}
    </s.HistogramContainer>
  );
};
