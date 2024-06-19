import { useState } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { getPercentileLabel } from "../../../../../../utils/getPercentileLabel";
import { Pagination } from "../../../../../common/Pagination";
import { Tooltip } from "../../../../../common/Tooltip";
import { Link } from "../../../../styles";
import {
  DurationPercentile,
  SpanDurationBreakdownEntry
} from "../../../../types";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import { DurationBreakdownInsightProps } from "./types";

const DEFAULT_PERCENTILE = 0.5;
const PAGE_SIZE = 3;

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
    title += `\n${getPercentileLabel(
      percentile.percentile
    )}: ${getDurationString(percentile.duration)}`;
  });

  return <s.DurationTitle>{title}</s.DurationTitle>;
};

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const DurationBreakdownInsight = ({
  insight,
  onAssetLinkClick,
  onRecalculate,
  onRefresh
}: DurationBreakdownInsightProps) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);

  const filteredEntries = insight.breakdownEntries.filter((entry) =>
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

  const [pageItems, page, setPage] = usePagination(
    sortedEntries,
    PAGE_SIZE,
    insight.codeObjectId
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handlePercentileViewModeChange = (value: number) => {
    setPercentileViewMode(value);
  };

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <s.EntryList>
          {pageItems.map((entry) => {
            const percentile = getPercentile(entry, percentileViewMode);

            const name = entry.spanDisplayName;
            const spanCodeObjectId = entry.spanCodeObjectId;

            return percentile ? (
              <s.Entry key={spanCodeObjectId}>
                <Tooltip title={name}>
                  <s.EntryName>
                    <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                      {name}
                    </Link>
                  </s.EntryName>
                </Tooltip>
                <Tooltip title={getDurationTitle(entry)}>
                  <s.Duration>
                    {getDurationString(percentile.duration)}
                  </s.Duration>
                </Tooltip>
              </s.Entry>
            ) : null;
          })}
          <Pagination
            itemsCount={sortedEntries.length}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </s.EntryList>
      }
      onPercentileViewModeChange={handlePercentileViewModeChange}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
