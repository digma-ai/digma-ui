import { format } from "date-fns";
import { SVGProps, useEffect, useMemo, useState } from "react";
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
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { isNumber } from "../../../../typeGuards/isNumber";
import { measureTextWidth } from "../../../../utils/measureTextWidth";
import { HistogramIcon } from "../../../common/icons/30px/HistogramIcon";
import { PetalsIcon } from "../../../common/icons/32px/PetalsIcon";
import { actions } from "../../actions";
import * as s from "./styles";
import {
  ErrorOccurrenceRecord,
  GetErrorTimeSeriesDataPayload,
  HorizontalCoordinatesGeneratorProps,
  OccurrenceChartProps,
  SetErrorTimeSeriesDataPayload
} from "./types";

const MAX_BAR_WIDTH = 32;
const Y_AXIS_PADDING = 4;

export const OccurrenceChart = ({
  errorId,
  spanCodeObjectId,
  service
}: OccurrenceChartProps) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<
    SetErrorTimeSeriesDataPayload | undefined
  >();

  const { environment } = useConfigSelector();
  const environmentId = environment?.id;

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

  const dataFetcherConfiguration: DataFetcherConfiguration = useMemo(
    () => ({
      requestAction: actions.GET_ERROR_TIME_SERIES_DATA,
      responseAction: actions.SET_ERROR_TIME_SERIES_DATA,
      refreshOnPayloadChange: true
    }),
    []
  );

  const payload: GetErrorTimeSeriesDataPayload = useMemo(
    () => ({
      errorId,
      scope: {
        spanCodeObjectId,
        service,
        environment: environmentId ?? ""
      }
    }),
    [errorId, spanCodeObjectId, service, environmentId]
  );

  const { data } = useFetchData<
    GetErrorTimeSeriesDataPayload,
    SetErrorTimeSeriesDataPayload
  >(dataFetcherConfiguration, payload);

  useEffect(() => {
    if (data && data.errorId === errorId) {
      setChartData(data);
    }
  }, [data, errorId]);

  const maxOccurrence = useMemo(
    () =>
      chartData?.dailyOccurrence.reduce((acc, cur) => {
        return acc >= cur.value ? acc : cur.value;
      }, 0) ?? 0,
    [chartData]
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
      {chartData?.dailyOccurrence ? (
        chartData.dailyOccurrence.length > 0 ? (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart
              data={chartData.dailyOccurrence}
              maxBarSize={MAX_BAR_WIDTH}
            >
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
                tickFormatter={(x: string) => format(new Date(x), "MM/dd")}
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
                    .payload as ErrorOccurrenceRecord;

                  return (
                    <s.TooltipContainer>
                      <span>Occurrences: {value}</span>
                      <span>{format(new Date(date), "MM/dd/yyyy")}</span>
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
            <PetalsIcon size={32} color={"currentColor"} />
          </s.EmptyStateIconContainer>
          <span>Loading</span>
        </s.EmptyStateContainer>
      )}
    </s.HistogramContainer>
  );
};
