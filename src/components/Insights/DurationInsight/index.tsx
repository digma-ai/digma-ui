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
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getPercentileLabel } from "../../../utils/getPercentileLabel";
import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { DurationChange } from "../DurationChange";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import { HistogramBarData, Trace } from "../types";
import * as s from "./styles";
import { DurationInsightProps, TickData } from "./types";

const LAST_CALL_TIME_DISTANCE_LIMIT = 60 * 1000; // in milliseconds

const BAR_WIDTH = 5;

const convertDurationStringToNumber = (value: string): number => {
  const res = value.match(/^(\d+):(\d+):([\d.]+)$/);

  if (!res) {
    return 0;
  }

  return Number(res[1]) * 60 * 60 + Number(res[2]) * 60 + Number(res[3]);
};

const getBarColor = (value: string, p50?: string, p95?: string) => {
  const blueColor = "#4b46a2";
  const purpleColor = "#6f46a2";
  const redColor = "#a24666";

  if (
    p50 &&
    convertDurationStringToNumber(value) < convertDurationStringToNumber(p50)
  ) {
    return blueColor;
  }

  if (
    p95 &&
    convertDurationStringToNumber(value) > convertDurationStringToNumber(p95)
  ) {
    return redColor;
  }

  return purpleColor;
};

const getTickColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#b4b8bf";
  }
};

const calculateBars = (
  bars: HistogramBarData[],
  chartWidth: number
): HistogramBarData[] => {
  const barWidth = BAR_WIDTH * 2;
  const newBarCount = Math.floor(chartWidth / barWidth);
  const barsCount = bars[bars.length - 1].index;
  const groupSize = Math.ceil(barsCount / newBarCount);

  const newBars: HistogramBarData[] = [];

  for (let i = 0, j = 0; i < bars.length - 1; i += groupSize, j++) {
    const group = bars.slice(i, i + groupSize);
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

export const DurationInsight = (props: DurationInsightProps) => {
  // const config = useContext(ConfigContext);
  const theme = useTheme();
  const tickColor = getTickColor(theme);
  const { observe, width } = useDimensions();

  const sortedPercentiles = [...props.insight.percentiles].sort(
    (a, b) => a.percentile - b.percentile
  );

  const spanLastCall = props.insight.lastSpanInstanceInfo;

  const handleHistogramButtonClick = () => {
    props.insight.spanInfo &&
      props.onHistogramButtonClick(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
        props.insight.type
      );
  };

  const handleLiveButtonClick = () => {
    props.insight.prefixedCodeObjectId &&
      props.onLiveButtonClick(props.insight.prefixedCodeObjectId);
  };

  // const handleCompareButtonClick = (traces: [Trace, Trace]) => {
  //   props.onCompareButtonClick(traces, props.insight.type);
  // };

  const traces: Trace[] = [];

  const isLastCallRecent = spanLastCall
    ? Date.now() - new Date(spanLastCall.startTime).valueOf() <
      LAST_CALL_TIME_DISTANCE_LIMIT
    : false;

  const histogramData = [];

  if (props.insight.histogramData) {
    const calculatedBars = calculateBars(
      props.insight.histogramData.bars,
      width
    );

    for (let i = 0; i < calculatedBars.length; i++) {
      const bar = calculatedBars[i];

      if (i === 0 && bar.index > 0) {
        for (let j = 0; j < bar.index; j++) {
          histogramData[j] = {
            index: j,
            count: 0,
            start: "",
            end: ""
          };
        }
      }

      if (i !== 0) {
        const prevBar = calculatedBars[i - 1];
        for (let j = prevBar.index + 1; j < bar.index; j++) {
          histogramData[j] = {
            index: j,
            count: 0,
            start: "",
            end: ""
          };
        }
      }

      histogramData[bar.index] = bar;
    }
  }

  const p50 = props.insight.histogramData?.quantiles.find(
    (x) => x.quantileValue === 0.5
  )?.timestamp;

  const p95 = props.insight.histogramData?.quantiles.find(
    (x) => x.quantileValue === 0.95
  )?.timestamp;

  const p50BarIndex = p50
    ? histogramData.findIndex(
        (x) =>
          convertDurationStringToNumber(x.end) >=
          convertDurationStringToNumber(p50)
      )
    : undefined;

  const p95BarIndex = p95
    ? histogramData.findIndex(
        (x) =>
          convertDurationStringToNumber(x.end) >=
          convertDurationStringToNumber(p95)
      )
    : undefined;

  const ticks: Record<number, TickData> = {};

  if (p50 && p50BarIndex) {
    ticks[p50BarIndex] = { value: p50, label: "P50" };
  }

  if (p95 && p95BarIndex) {
    ticks[p95BarIndex] = { value: p95, label: "P95" };
  }

  return (
    <InsightCard
      data={props.insight}
      isRecent={isLastCallRecent}
      content={
        <s.Container>
          {spanLastCall && (
            <s.Stats>
              <Description>Last call</Description>
              <s.ValueContainer>
                <s.Value>
                  {spanLastCall.duration.value} {spanLastCall.duration.unit}
                </s.Value>
                <s.LastCallTimeDistance isRecent={isLastCallRecent}>
                  •{" "}
                  {isLastCallRecent
                    ? "Moments ago"
                    : formatTimeDistance(spanLastCall.startTime)}
                </s.LastCallTimeDistance>
              </s.ValueContainer>
            </s.Stats>
          )}
          {sortedPercentiles.length > 0 ? (
            <>
              {sortedPercentiles.map((percentile) => {
                if (percentile.traceIds.length > 0) {
                  traces.push({
                    id: percentile.traceIds[0],
                    name: `P${percentile.percentile * 100}`
                  });
                }

                return (
                  <s.Stats key={percentile.percentile}>
                    <Description>
                      {getPercentileLabel(percentile.percentile)}
                    </Description>
                    <s.ValueContainer>
                      <s.Value>
                        {`${percentile.currentDuration.value} ${percentile.currentDuration.unit}`}
                      </s.Value>
                      <DurationChange
                        currentDuration={percentile.currentDuration}
                        previousDuration={percentile.previousDuration}
                        changeTime={percentile.changeTime}
                        changeVerified={percentile.changeVerified}
                      />
                    </s.ValueContainer>
                  </s.Stats>
                );
              })}
            </>
          ) : (
            // TODO: add hourglass icon
            <span>Waiting for more data...</span>
          )}

          {props.insight.histogramData && (
            <s.HistogramContainer ref={observe}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
                  barSize={BAR_WIDTH}
                  barGap={BAR_WIDTH}
                  data={histogramData}
                >
                  <Bar
                    dataKey={"count"}
                    radius={BAR_WIDTH / 2}
                    isAnimationActive={false}
                  >
                    {histogramData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.end, p50, p95)}
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
                            Duration range: {data.start}-{data.end}
                          </span>
                        </s.TooltipContainer>
                      );
                    }}
                    isAnimationActive={false}
                  />
                  <XAxis
                    stroke={tickColor}
                    tick={Boolean(Object.keys(ticks).length)}
                    ticks={Object.keys(ticks).map((x) => Number(x))}
                    tickFormatter={(x: number) => ticks[x].value}
                  />
                  {Object.entries(ticks).map(([barIndex, tickData]) => (
                    <ReferenceLine
                      key={tickData.label}
                      x={Number(barIndex)}
                      stroke={tickColor}
                      strokeDasharray={"5 5"}
                      label={{
                        position: "top",
                        value: tickData.label,
                        fill: tickColor
                      }}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </s.HistogramContainer>
          )}
        </s.Container>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      isAsync={props.insight.isAsync}
      buttons={[
        ...(props.insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>
            ]
          : []),
        // ...(config.isJaegerEnabled && traces.length > 1
        //   ? [
        //       <Button
        //         key={"compare"}
        //         onClick={() => handleCompareButtonClick([traces[0], traces[1]])}
        //       >
        //         Compare
        //       </Button>
        //     ]
        //   : []),
        ...(props.insight.prefixedCodeObjectId
          ? [
              <Button
                icon={{ component: DoubleCircleIcon }}
                key={"live"}
                buttonType={"secondary"}
                onClick={handleLiveButtonClick}
              >
                Live
              </Button>
            ]
          : [])
      ]}
    />
  );
};
