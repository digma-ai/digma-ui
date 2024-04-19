import useDimensions from "react-cool-dimensions";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import { DefaultTheme, useTheme } from "styled-components";
import { PERCENTILES } from "../../../../../../constants";
import { Duration } from "../../../../../../globals";
import { isNumber } from "../../../../../../typeGuards/isNumber";
import { convertToDuration } from "../../../../../../utils/convertToDuration";
import { formatTimeDistance } from "../../../../../../utils/formatTimeDistance";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { getPercentileLabel } from "../../../../../../utils/getPercentileLabel";
import { Tag } from "../../../../../common/v3/Tag";
import { Tooltip as CommonTooltip } from "../../../../../common/v3/Tooltip";
import {
  HistogramBarData,
  NormalizedHistogramBarData,
  Trace
} from "../../../../types";
import {
  DurationChange,
  isChangeMeaningfulEnough
} from "../common/DurationChange";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ReferenceLineLabel } from "./ReferenceLineLabel";
import { XAxisTick } from "./XAxisTick";
import { DIVIDER, LABEL_HEIGHT } from "./constants";
import * as s from "./styles";
import { SpanDurationsInsightCardProps, TickData } from "./types";

const LAST_CALL_TIME_DISTANCE_LIMIT = 60 * 1000; // in milliseconds

// in pixels
const MIN_BAR_HEIGHT = 5;
const MAX_BAR_HEIGHT = 80;
const BAR_WIDTH = 6;
const MIN_X_AXIS_PADDING = 50;
const MIN_CHART_CONTAINER_HEIGHT = 135;
const CHART_Y_MARGIN = LABEL_HEIGHT;
const MIN_BAR_DISTANCE = 5; // minimum distance between the bars before moving the labels aside

const getBarColor = (
  theme: DefaultTheme,
  value: Duration,
  p50?: Duration,
  p95?: Duration
) => {
  if (p50 && value.raw < p50.raw) {
    return theme.colors.v3.barChart.blue;
  }

  if (p95 && value.raw >= p95.raw) {
    return theme.colors.v3.barChart.pink;
  }

  return theme.colors.v3.barChart.purple;
};

const calculateBars = (
  bars: HistogramBarData[],
  chartWidth: number
): HistogramBarData[] => {
  const filledBars: HistogramBarData[] = [];

  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];

    if (i === 0 && bar.index > 0) {
      const interval = bar.end.raw - bar.start.raw;

      for (let j = bar.index - 1, offset = 0; j >= 0; j--, offset++) {
        filledBars[j] = {
          index: j,
          count: 0,
          start: convertToDuration(bar.start.raw - interval * (offset + 1)),
          end: convertToDuration(bar.start.raw - interval * offset)
        };
      }
    }

    if (i !== 0) {
      const prevBar = bars[i - 1];
      const gapCount = bar.index - prevBar.index - 1;
      const interval = (bar.end.raw - prevBar.start.raw) / gapCount;

      for (
        let j = prevBar.index + 1, offset = 0;
        j < bar.index;
        j++, offset++
      ) {
        filledBars[j] = {
          index: j,
          count: 0,
          start: convertToDuration(prevBar.end.raw + interval * offset),
          end: convertToDuration(prevBar.end.raw + interval * (offset + 1))
        };
      }
    }

    filledBars[bar.index] = bar;
  }

  const barReservedWidth = BAR_WIDTH * 2;
  const newBarCount = Math.floor(chartWidth / barReservedWidth);
  const barsCount = filledBars.length;
  const groupSize = Math.ceil(barsCount / newBarCount);

  const newBars: HistogramBarData[] = [];

  for (let i = 0, j = 0; i < barsCount; i += groupSize, j++) {
    const group = filledBars.slice(i, i + groupSize);
    const newCount = group.reduce((acc, cur) => acc + cur.count, 0);

    newBars.push({
      index: j,
      count: newCount,
      start: group[0].start,
      end: group[group.length - 1].end
    });
  }

  return newBars;
};

export const SpanDurationsInsightCard = ({
  insight,
  onLiveButtonClick,
  onRecalculate,
  onRefresh,
  onHistogramButtonClick,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: SpanDurationsInsightCardProps) => {
  const theme = useTheme();
  const { observe, width } = useDimensions();

  const sortedPercentiles = [...insight.percentiles].sort(
    (a, b) => a.percentile - b.percentile
  );

  const spanLastCall = insight.lastSpanInstanceInfo;
  const lastCallDurationString = spanLastCall
    ? getDurationString(spanLastCall.duration)
    : "";
  const averageDurationString = insight.average
    ? `
${getDurationString(insight.average)}${
        insight.standardDeviation && insight.standardDeviation.raw > 0
          ? ` ± ${getDurationString(insight.standardDeviation)}`
          : ""
      }`
    : "";

  const handleGoToLive = () => {
    onLiveButtonClick(insight.codeObjectId);
  };

  const traces: Trace[] = [];

  const isLastCallRecent = spanLastCall
    ? Date.now() - new Date(spanLastCall.startTime).valueOf() <
      LAST_CALL_TIME_DISTANCE_LIMIT
    : false;

  const chartData = insight.histogramPlot
    ? calculateBars(
        insight.histogramPlot.bars,
        Math.max(width - MIN_X_AXIS_PADDING * 2, 0)
      )
    : [];

  const XAxisPadding = Math.max(
    (width - chartData.length * BAR_WIDTH * 2) / 2,
    MIN_X_AXIS_PADDING
  );

  const p50 = insight.histogramPlot?.quantiles.find(
    (x) => x.quantileValue === 0.5
  )?.timestamp;

  const p95 = insight.histogramPlot?.quantiles.find(
    (x) => x.quantileValue === 0.95
  )?.timestamp;

  const p50BarIndex = p50
    ? chartData.findIndex((x) => x.end.raw >= p50.raw)
    : undefined;

  const p95BarIndex = p95
    ? chartData.findIndex((x) => x.end.raw >= p95.raw)
    : undefined;

  const ticks: Record<number, TickData> = {};

  const isP50Present = p50 && isNumber(p50BarIndex) && p50BarIndex > -1;
  const isP95Present = p95 && isNumber(p95BarIndex) && p95BarIndex > -1;

  if (isP50Present) {
    ticks[p50BarIndex] = {
      value: getDurationString(p50),
      label: getPercentileLabel(0.5)
    };
  }

  if (isP95Present) {
    ticks[p95BarIndex] = {
      value: getDurationString(p95),
      label: getPercentileLabel(0.95)
    };
  }

  if (
    isP50Present &&
    isP95Present &&
    p95BarIndex - p50BarIndex <= MIN_BAR_DISTANCE
  ) {
    ticks[p50BarIndex].textAnchor = "end";
    ticks[p95BarIndex].textAnchor = "start";
  }

  if (isP50Present && isP95Present && p50BarIndex === p95BarIndex) {
    ticks[p95BarIndex] = {
      value: [getDurationString(p50), getDurationString(p95)].join(DIVIDER),
      label: [getPercentileLabel(0.5), getPercentileLabel(0.95)].join(DIVIDER),
      multiline: true
    };
  }

  const notEmptyBars = chartData.filter((x) => x.count > 0);

  if (!p50 && !p95 && notEmptyBars.length) {
    const minBar = notEmptyBars[0];
    ticks[minBar.index] = {
      value: getDurationString(minBar.start),
      textAnchor: "end"
    };

    const maxBar = notEmptyBars[notEmptyBars.length - 1];
    ticks[maxBar.index] = {
      value: getDurationString(maxBar.end),
      textAnchor: "start"
    };

    if (minBar.index === maxBar.index) {
      ticks[maxBar.index] = {
        value: `${getDurationString(minBar.start)} ${getDurationString(
          maxBar.end
        )}`
      };
    }
  }

  let chartContainerHeight = MIN_CHART_CONTAINER_HEIGHT;
  let chartMarginTop = CHART_Y_MARGIN;
  let chartMarginBottom = 0;
  const hasMultilineLabels = Object.values(ticks).some((x) => x.multiline);

  if (hasMultilineLabels) {
    chartMarginTop += CHART_Y_MARGIN;
    chartMarginBottom += CHART_Y_MARGIN;
    chartContainerHeight += CHART_Y_MARGIN * 2;
  }

  const maxCount = Math.max(...notEmptyBars.map((x) => x.count));
  const normalizedChartData: NormalizedHistogramBarData[] = chartData.map(
    (x) => ({
      ...x,
      normalizedCount:
        x.count > 0
          ? Math.max((maxCount / MAX_BAR_HEIGHT) * MIN_BAR_HEIGHT, x.count)
          : 0
    })
  );

  return (
    <InsightCard
      insight={insight}
      content={
        <s.Container>
          <ColumnsContainer>
            {!insight.histogramPlot && (
              <s.DescriptionColumn label={"Description"}>
                Trigger more actions to see the full duration analysis
              </s.DescriptionColumn>
            )}
            {spanLastCall && (
              <KeyValue label={"Last call"}>
                <CommonTooltip
                  title={
                    isLastCallRecent
                      ? "Moments ago"
                      : formatTimeDistance(spanLastCall.startTime)
                  }
                >
                  <Tag
                    type={"default"}
                    content={lastCallDurationString}
                    title={lastCallDurationString}
                  />
                </CommonTooltip>
              </KeyValue>
            )}
            {sortedPercentiles.length > 0 ? (
              <>
                {sortedPercentiles.map((percentile) => {
                  if (percentile.traceIds.length > 0) {
                    traces.push({
                      id: percentile.traceIds[0],
                      name:
                        PERCENTILES.find(
                          (x) => x.percentile === percentile.percentile
                        )?.label || `P${percentile.percentile * 100}`
                    });
                  }

                  const isChangeMeaningful = isChangeMeaningfulEnough(
                    percentile.currentDuration,
                    percentile.previousDuration,
                    percentile.changeTime
                  );

                  return isChangeMeaningful ? (
                    <KeyValue
                      key={percentile.percentile}
                      label={getPercentileLabel(percentile.percentile)}
                    >
                      <DurationChange
                        currentDuration={percentile.currentDuration}
                        previousDuration={percentile.previousDuration}
                        changeTime={percentile.changeTime}
                      />
                    </KeyValue>
                  ) : null;
                })}
              </>
            ) : (
              <span>Waiting for more data...</span>
            )}
            {!insight.histogramPlot &&
              insight.average &&
              insight.average.raw > 0 && (
                <KeyValue label={"Average"}>
                  <Tag
                    content={averageDurationString}
                    title={averageDurationString}
                    type={"default"}
                  />
                </KeyValue>
              )}
          </ColumnsContainer>
          {insight.histogramPlot && (
            <s.ChartContainer ref={observe} $height={chartContainerHeight}>
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart
                  margin={{
                    top: chartMarginTop,
                    right: 0,
                    bottom: chartMarginBottom,
                    left: 0
                  }}
                  barSize={BAR_WIDTH}
                  data={normalizedChartData}
                >
                  <Bar
                    dataKey={"normalizedCount"}
                    radius={[BAR_WIDTH / 2, BAR_WIDTH / 2, 0, 0]}
                    isAnimationActive={false}
                  >
                    {normalizedChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(theme, entry.end, p50, p95)}
                      />
                    ))}
                  </Bar>
                  <Tooltip
                    cursor={false}
                    content={(x) => {
                      const data = x.payload
                        ? (x.payload[0]?.payload as HistogramBarData)
                        : null;

                      if (!data || data.count === 0) {
                        return;
                      }

                      return (
                        <s.TooltipContainer>
                          <span>Request count: {data.count}</span>
                          <span>
                            Duration range: {getDurationString(data.start)} -{" "}
                            {getDurationString(data.end)}
                          </span>
                        </s.TooltipContainer>
                      );
                    }}
                    isAnimationActive={false}
                  />
                  <XAxis
                    padding={{ left: XAxisPadding, right: XAxisPadding }}
                    stroke={theme.colors.v3.stroke.primary}
                    tick={(props) => <XAxisTick {...props} ticks={ticks} />}
                    interval={0}
                    ticks={Object.keys(ticks).map((x) => Number(x))}
                    tickFormatter={(x: number) => ticks[x].value}
                    height={20}
                  />
                  {Object.entries(ticks)
                    .filter(([, tickData]) => tickData.label)
                    .map(([barIndex, tickData]) => (
                      <ReferenceLine
                        key={tickData.label}
                        x={Number(barIndex)}
                        stroke={theme.colors.v3.stroke.secondary}
                        strokeDasharray={"5 5"}
                        label={{
                          value: tickData.label,
                          textAnchor: tickData.textAnchor,
                          content: ReferenceLineLabel
                        }}
                      />
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </s.ChartContainer>
          )}
        </s.Container>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      isAsync={insight.isAsync}
      onGoToLive={handleGoToLive}
      onOpenHistogram={insight.spanInfo ? onHistogramButtonClick : undefined}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
