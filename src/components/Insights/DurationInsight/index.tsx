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

export const DurationInsight = (props: DurationInsightProps) => {
  const sortedPercentiles = [...props.insight.percentiles].sort(
    (a, b) => a.percentile - b.percentile
  );

  const spanLastCall = props.insight.lastSpanInstanceInfo;

  const handleHistogramButtonClick = () => {
    // TODO:
    console.log("Histogram");
  };

  const handleLiveButtonClick = () => {
    // TODO:
    console.log("Live");
  };

  const handleCompareButtonClick = (traces: [Trace, Trace]) => {
    // TODO:
  };

  const traceIds: string[] = [];

  return (
    <InsightCard
      data={props.insight}
      content={
        <>
          <s.LastCall>
            Last call: {spanLastCall.duration.value}{" "}
            {spanLastCall.duration.unit}{" "}
            {formatTimeDistance(spanLastCall.startTime)}
          </s.LastCall>
          {sortedPercentiles.length > 0 ? (
            <>
              <s.PercentileList>
                {sortedPercentiles.map((percentile) => {
                  if (traceIds.length > 0) {
                    traceIds.push(percentile.traceIds[0]);
                  }

                  return (
                    <s.Percentile key={percentile.percentile}>
                      {`${getPercentileLabel(percentile.percentile)}: ${
                        percentile.currentDuration.value
                      } ${percentile.currentDuration.unit}`}
                      <DurationChange
                        currentDuration={percentile.currentDuration}
                        previousDuration={percentile.previousDuration}
                        changeTime={percentile.changeTime}
                        changeVerified={percentile.changeVerified}
                      />
                    </s.Percentile>
                  );
                })}
              </s.PercentileList>
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
        </>
      }
      buttons={[
        <Button
          icon={{ component: ChartIcon }}
          key={"histogram"}
          onClick={handleHistogramButtonClick}
        >
          Histogram
        </Button>,
        <Button
          icon={{ component: DoubleCircleIcon }}
          key={"live"}
          buttonType={"secondary"}
          onClick={handleLiveButtonClick}
        >
          Live
        </Button>
      ]}
    />
  );
};
