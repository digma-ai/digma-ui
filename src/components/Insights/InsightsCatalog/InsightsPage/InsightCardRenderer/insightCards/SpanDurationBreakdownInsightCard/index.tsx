import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../../../../../../featureFlags";
import { usePagination } from "../../../../../../../hooks/usePagination";
import { usePrevious } from "../../../../../../../hooks/usePrevious";
import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import { isNumber } from "../../../../../../../typeGuards/isNumber";
import { FeatureFlag } from "../../../../../../../types";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { getPercentileLabel } from "../../../../../../../utils/getPercentileLabel";
import { roundTo } from "../../../../../../../utils/roundTo";
import { Info } from "../../../../../../common/v3/Info";
import { Pagination } from "../../../../../../common/v3/Pagination";
import { Tag } from "../../../../../../common/v3/Tag";
import type {
  DurationPercentile,
  SpanDurationBreakdownEntry
} from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { PercentileViewModeToggle } from "../common/InsightCard/PercentileViewModeToggle";
import * as s from "./styles";
import type {
  ColumnMeta,
  SpanDurationBreakdownInsightCardProps
} from "./types";

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
  const sortedPercentiles = [...breakdownEntry.percentiles].sort(
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

export const SpanDurationBreakdownInsightCard = ({
  insight,
  onAssetLinkClick,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: SpanDurationBreakdownInsightCardProps) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);

  const [data, setData] = useState<{
    items: SpanDurationBreakdownEntry[];
  }>({
    items: []
  });

  const { backendInfo } = useConfigSelector();
  const isQuantitySupported = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsDurationBreakdownQuantityEnabled
  );
  const isPercentageOfCallsSupported = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsDurationBreakdownQuantityEnabled
  );

  const columnHelper = createColumnHelper<SpanDurationBreakdownEntry>();

  const handleSpanLinkClick = (spanCodeObjectId: string) => () => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const columns = [
    columnHelper.accessor((row) => row, {
      header: "Asset",
      id: "asset",
      meta: {
        width: "55%",
        minWidth: 100
      },
      cell: (info) => {
        const { spanCodeObjectId, spanDisplayName } = info.getValue();
        return (
          <s.TableItem
            key={spanCodeObjectId}
            name={spanDisplayName}
            onClick={handleSpanLinkClick(spanCodeObjectId)}
          />
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "Quantity",
      id: "quantity",
      meta: {
        minWidth: 30,
        width: "15%",
        info: "The number of times this asset repeats within the trace. The duration shown next to this column represents the overall duration of all asset instances."
      },
      cell: (info) => {
        const entry = info.getValue();

        const percentile = getPercentile(entry, percentileViewMode);
        const quantity = percentile?.occurrence;
        if (!quantity) {
          return null;
        }

        return (
          <Tag
            key={"quantity"}
            title={quantity}
            type={"highlight"}
            content={quantity}
          />
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "% Calls",
      id: "percentageOfCalls",
      meta: {
        minWidth: 30,
        width: "15%",
        info: "The percentage of calls triggering this child asset"
      },
      cell: (info) => {
        const entry = info.getValue();

        const percentageOfCalls = entry.percentageOfCalls;
        if (!percentageOfCalls) {
          return null;
        }

        const percentageString = `${
          percentageOfCalls < 1 ? "<1" : roundTo(percentageOfCalls, 2)
        }%`;

        return (
          <Tag
            key={"percentageOfCalls"}
            title={percentageString}
            type={"highlight"}
            content={percentageString}
          />
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "Duration",
      id: "duration",
      meta: {
        minWidth: 30,
        width: "15%",
        info: "The execution time of the asset"
      },
      cell: (info) => {
        const entry = info.getValue();

        const percentile = getPercentile(entry, percentileViewMode);
        if (!percentile) {
          return null;
        }

        const title = getDurationTitle(entry);

        return (
          <Tag
            key={"duration"}
            title={title}
            type={"highlight"}
            content={getDurationString(percentile.duration)}
          />
        );
      }
    })
  ];

  let columnVisibility = { quantity: false, percentageOfCalls: false };
  if (isQuantitySupported) {
    columnVisibility = { ...columnVisibility, quantity: true };
  }
  if (isPercentageOfCallsSupported) {
    columnVisibility = { ...columnVisibility, percentageOfCalls: true };
  }

  const filteredItems = useMemo(
    () =>
      insight.breakdownEntries.filter((entry) =>
        entry.percentiles.some(
          (percentile) => percentile.percentile === percentileViewMode
        )
      ),
    [percentileViewMode, insight.breakdownEntries]
  );

  const sortedItems = useMemo(
    () =>
      [...filteredItems].sort((a, b) => {
        const aPercentile = getPercentile(a, percentileViewMode);
        const bPercentile = getPercentile(b, percentileViewMode);

        if (aPercentile && bPercentile) {
          return bPercentile.duration.raw - aPercentile.duration.raw;
        }

        return 0;
      }),
    [filteredItems, percentileViewMode]
  );

  const [pageItems, page, setPage] = usePagination(
    sortedItems,
    PAGE_SIZE,
    insight.id
  );

  const table = useReactTable({
    data: data.items,
    columns,
    state: {
      columnVisibility
    },
    getCoreRowModel: getCoreRowModel()
  });
  const previousPage = usePrevious(page);
  const previousInsightId = usePrevious(insight.id);

  const handlePercentileViewModeChange = (value: number) => {
    setPercentileViewMode(value);
  };

  // Keep pageItems in state to avoid table infinite re-rendering
  // More info: https://github.com/TanStack/table/issues/4614
  useEffect(() => {
    if (
      Boolean(previousInsightId && previousInsightId !== insight.id) ||
      (isNumber(previousPage) && previousPage !== page)
    ) {
      setData({ items: pageItems });
    }
  }, [previousInsightId, insight, previousPage, page, pageItems]);

  useEffect(() => {
    if (sortedItems.length > 0 && data.items.length === 0) {
      setData({ items: sortedItems.slice(0, PAGE_SIZE) });
    }
  }, [sortedItems, data.items]);

  const renderTable = () => (
    <s.Table>
      <s.TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <s.TableHeadRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta as ColumnMeta;

              return (
                <s.TableHeaderCell
                  key={header.id}
                  style={{
                    width: meta.width,
                    minWidth: meta.minWidth
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {meta.info && <Info title={meta.info} />}
                </s.TableHeaderCell>
              );
            })}
          </s.TableHeadRow>
        ))}
      </s.TableHead>
      <s.TableBody>
        {table.getRowModel().rows.map((row) => (
          <s.TableBodyRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as ColumnMeta;

              return (
                <s.TableBodyCell
                  key={cell.id}
                  style={{
                    width: meta.width,
                    minWidth: meta.minWidth
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </s.TableBodyCell>
              );
            })}
          </s.TableBodyRow>
        ))}
      </s.TableBody>
    </s.Table>
  );

  return (
    <InsightCard
      insight={insight}
      content={
        <s.Container>
          <PercentileViewModeToggle
            viewMode={percentileViewMode}
            onChange={handlePercentileViewModeChange}
          />
          {renderTable()}
          <Pagination
            itemsCount={sortedItems.length}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            withDescription={true}
          />
        </s.Container>
      }
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
