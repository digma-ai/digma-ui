import { useState } from "react";
import { getPercentileLabel } from "../../../utils/getPercentileLabel";
import { Tooltip } from "../../common/Tooltip";
import { InsightCard } from "../InsightCard";
import { Pagination } from "../Pagination";
import { Link } from "../styles";
import { DurationPercentile, SpanDurationBreakdownEntry } from "../types";
import * as s from "./styles";
import { DurationBreakdownInsightProps } from "./types";

const DEFAULT_PERCENTILE = 0.5;

const getPercentile = (
  entry: SpanDurationBreakdownEntry,
  requestedPercentile: number
): DurationPercentile | undefined => {
  for (const percentile of entry.percentiles) {
    if (percentile.percentile === requestedPercentile) {
      return percentile;
    }
  }
};

const getDurationTitle = (breakdownEntry: SpanDurationBreakdownEntry) => {
  const sortedPercentiles = breakdownEntry.percentiles.sort(
    (a, b) => a.percentile - b.percentile
  );

  let title = "Percentage of time spent in span:";

  sortedPercentiles.forEach((percentile) => {
    title += `\n${getPercentileLabel(percentile.percentile)}: ${
      percentile.duration.value
    } ${percentile.duration.unit}`;
  });

  return <s.DurationTitle>{title}</s.DurationTitle>;
};

export const DurationBreakdownInsight = (
  props: DurationBreakdownInsightProps
) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);

  const filteredEntries = props.insight.breakdownEntries.filter((entry) =>
    entry.percentiles.some(
      (percentile) => percentile.percentile === percentileViewMode
    )
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const aPercentile = getPercentile(a, percentileViewMode);
    const bPercentile = getPercentile(b, percentileViewMode);

    if (aPercentile && bPercentile) {
      return bPercentile.duration.raw - aPercentile.duration.raw;
    }

    return 0;
  });

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId);
  };

  const handlePercentileViewModeChange = (value: number) => {
    setPercentileViewMode(value);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.EntryList>
          <Pagination
            id={`${props.insight.codeObjectId}_${props.insight.type}`}
          >
            {sortedEntries.map((entry) => {
              const percentile = getPercentile(entry, percentileViewMode);

              const name = entry.spanDisplayName;
              const spanCodeObjectId = entry.spanCodeObjectId;

              return percentile ? (
                <s.Entry key={spanCodeObjectId}>
                  <Tooltip title={name}>
                    <s.EntryName>
                      <Link
                        onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                      >
                        {name}
                      </Link>
                    </s.EntryName>
                  </Tooltip>
                  <Tooltip title={getDurationTitle(entry)}>
                    <s.Duration>{`${percentile.duration.value} ${percentile.duration.unit}`}</s.Duration>
                  </Tooltip>
                </s.Entry>
              ) : null;
            })}
          </Pagination>
        </s.EntryList>
      }
      onPercentileViewModeChange={handlePercentileViewModeChange}
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
