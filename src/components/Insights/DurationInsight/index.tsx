import { Bar, BarChart, Cell, ResponsiveContainer } from "recharts";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getPercentileLabel } from "../../../utils/getPercentileLabel";
import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { DurationChange } from "../DurationChange";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { DurationInsightProps } from "./types";

const LAST_CALL_TIME_DISTANCE_LIMIT = 60 * 1000; // in milliseconds

const TriangleBar = (props: any) => {
  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const { fill, x, y, width, height } = props as {
    fill: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export const DurationInsight = (props: DurationInsightProps) => {
  // const config = useContext(ConfigContext);

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
    for (let i = 0; i < props.insight.histogramData.bars.length - 1; i++) {
      const bar = props.insight.histogramData.bars[i];

      if (i !== 0) {
        const prevBar = props.insight.histogramData.bars[i - 1];
        for (let j = prevBar.index + 1; j < bar.index; j++) {
          histogramData.push({
            index: j,
            count: 0,
            start: "",
            end: ""
          });
        }
      }

      histogramData[i] = bar;
    }
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

          <s.HistogramContainer>
            {props.insight.histogramData && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  // width={500}
                  // height={300}
                  data={histogramData}
                  // margin={{
                  //   top: 20,
                  //   right: 30,
                  //   left: 20,
                  //   bottom: 5
                  // }}
                >
                  {/* <XAxis dataKey="index" /> */}
                  {/* <YAxis dataKey="count" /> */}
                  <Bar
                    dataKey={"count"}
                    // width={5}
                    // fill="#8884d8"
                    // shape={<TriangleBar />}
                    // label={{ position: "top" }}
                  >
                    {props.insight.histogramData.bars.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.count < 1 ? "red" : "#4e45a3"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </s.HistogramContainer>
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
