import { useContext } from "react";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getPercentileLabel } from "../../../utils/getPercentileLabel";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { DurationChange } from "../DurationChange";
import { InsightCard } from "../InsightCard";
import { Trace } from "../types";
import * as s from "./styles";
import { DurationInsightProps } from "./types";

const LAST_CALL_TIME_DISTANCE_LIMIT = 60 * 1000; // in milliseconds

export const DurationInsight = (props: DurationInsightProps) => {
  const config = useContext(ConfigContext);

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

  const handleCompareButtonClick = (traces: [Trace, Trace]) => {
    props.onCompareButtonClick(traces, props.insight.type);
  };

  const traces: Trace[] = [];

  const isLastCallRecent =
    Date.now() - new Date(spanLastCall.startTime).valueOf() <
    LAST_CALL_TIME_DISTANCE_LIMIT;

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.Container>
          <s.Stats>
            <s.Label>Last call</s.Label>
            <s.Value>
              <span>
                {spanLastCall.duration.value} {spanLastCall.duration.unit}
              </span>
              <s.LastCallTimeDistance isRecent={isLastCallRecent}>
                •{" "}
                {isLastCallRecent
                  ? "Moments ago"
                  : formatTimeDistance(spanLastCall.startTime)}
              </s.LastCallTimeDistance>
            </s.Value>
          </s.Stats>
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
                    <s.Label>
                      {getPercentileLabel(percentile.percentile)}
                    </s.Label>
                    <s.Value>
                      {`${percentile.currentDuration.value} ${percentile.currentDuration.unit}`}
                      <DurationChange
                        currentDuration={percentile.currentDuration}
                        previousDuration={percentile.previousDuration}
                        changeTime={percentile.changeTime}
                        changeVerified={percentile.changeVerified}
                      />
                    </s.Value>
                  </s.Stats>
                );
              })}
            </>
          ) : (
            // TODO: add hourglass icon
            <span>Waiting for more data...</span>
          )}
        </s.Container>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
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
        ...(config.isJaegerEnabled && traces.length > 1
          ? [
              <Button
                key={"compare"}
                onClick={() => handleCompareButtonClick([traces[0], traces[1]])}
              >
                Compare
              </Button>
            ]
          : []),
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
