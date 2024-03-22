import { useState } from "react";
import { usePagination } from "../../../../../hooks/usePagination";
import { getDurationString } from "../../../../../utils/getDurationString";
import { getPercentileLabel } from "../../../../../utils/getPercentileLabel";
import { Pagination } from "../../../../common/v3/Pagination";
import { Tag } from "../../../../common/v3/Tag";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { DurationPercentile, SpanDurationBreakdownEntry } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ListItem } from "../../InsightCard/ListItem";
import { PercentileViewModeToggle } from "../../InsightCard/PercentileViewModeToggle";
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

  const [pageItems, page, setPage] = usePagination(
    sortedEntries,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handlePercentileViewModeChange = (value: number) => {
    setPercentileViewMode(value);
  };

  return (
    <InsightCard
      insight={props.insight}
      content={
        <s.Container>
          <PercentileViewModeToggle
            viewMode={percentileViewMode}
            onChange={handlePercentileViewModeChange}
          />
          <s.EntryList>
            <s.EntryListHeader>
              <span>Asset</span>
              <span>Duration</span>
            </s.EntryListHeader>
            {pageItems.map((entry) => {
              const percentile = getPercentile(entry, percentileViewMode);

              const name = entry.spanDisplayName;
              const spanCodeObjectId = entry.spanCodeObjectId;

              return percentile ? (
                <ListItem
                  key={spanCodeObjectId}
                  name={name}
                  onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                  buttons={[
                    <Tooltip title={getDurationTitle(entry)} key={"duration"}>
                      <Tag
                        type={"highlight"}
                        content={getDurationString(percentile.duration)}
                      />
                    </Tooltip>
                  ]}
                />
              ) : null;
            })}
          </s.EntryList>
          <Pagination
            itemsCount={sortedEntries.length}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            withDescription={true}
          />
        </s.Container>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToSpan={props.onGoToSpan}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
