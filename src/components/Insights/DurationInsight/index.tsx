import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getPercentileLabel } from "../../../utils/getPercentileLabel";
import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { DurationChange } from "../DurationChange";
import { InsightCard } from "../InsightCard";
import { Trace } from "../types";
import * as s from "./styles";
import { DurationInsightProps } from "./types";

const LAST_CALL_TIME_DISTANCE_LIMIT = 10 * 1000; // in milliseconds

export const DurationInsight = (props: DurationInsightProps) => {
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
    props.onCompareButtonClick(traces);
  };

  const traceIds: string[] = [];

  const isLastCallRecent =
    Date.now() - new Date(spanLastCall.startTime).valueOf() <=
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
                if (traceIds.length > 0) {
                  traceIds.push(percentile.traceIds[0]);
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
              {traceIds.length > 1 && (
                <s.Button
                  onClick={() =>
                    handleCompareButtonClick([
                      { id: traceIds[0] },
                      { id: traceIds[1] }
                    ])
                  }
                >
                  Compare
                </s.Button>
              )}
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
