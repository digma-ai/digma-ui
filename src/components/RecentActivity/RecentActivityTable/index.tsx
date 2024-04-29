import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Duration } from "../../../globals";
import { isNumber } from "../../../typeGuards/isNumber";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../utils/getInsightTypeOrderPriority";
import { greenScale } from "../../common/App/v2colors";
import { NewButton } from "../../common/NewButton";
import { Tag } from "../../common/Tag";
import { Tooltip } from "../../common/Tooltip";
import { TraceIcon } from "../../common/icons/12px/TraceIcon";
import { Badge } from "../Badge";
import { ViewMode } from "../EnvironmentPanel/types";
import { ActivityEntry, EntrySpan, SlimInsight } from "../types";
import { getTagType } from "./getTagType";
import * as s from "./styles";
import { ColumnMeta, RecentActivityTableProps } from "./types";

const columnHelper = createColumnHelper<ActivityEntry>();

export const isRecent = (entry: ActivityEntry): boolean => {
  const MAX_DISTANCE = isNumber(window.recentActivityExpirationLimit)
    ? window.recentActivityExpirationLimit
    : 10 * 60 * 1000; // in milliseconds
  const now = new Date();
  return (
    now.valueOf() - new Date(entry.latestTraceTimestamp).valueOf() <=
    MAX_DISTANCE
  );
};

const renderBadge = () => (
  <s.BadgeContainer>
    <Badge backgroundColor={greenScale[300]} borderColor={greenScale[400]} />
  </s.BadgeContainer>
);

const renderTimeDistance = (timestamp: string, viewMode: ViewMode) => {
  const title = new Date(timestamp).toString();
  const timeDistanceString = formatTimeDistance(timestamp, {
    format: "medium",
    withDescriptiveWords: false
  });

  return viewMode === "table" ? (
    <Tag title={title} value={`${timeDistanceString} ago`} />
  ) : (
    <span>
      <Tooltip title={title}>
        <span>{timeDistanceString.replace(" ", "")}</span>
      </Tooltip>
      <s.ListSuffix>ago</s.ListSuffix>
    </span>
  );
};

const renderDuration = (duration: Duration, viewMode: ViewMode) =>
  viewMode === "table" ? (
    <Tag value={getDurationString(duration)} />
  ) : (
    <span>
      {duration.value}
      <s.ListSuffix>{duration.unit}</s.ListSuffix>
    </span>
  );

const renderInsights = (insights: SlimInsight[]) => {
  const sortedInsights = [...insights].sort(
    (a, b) =>
      (b.criticality || 0) - (a.criticality || 0) ||
      getInsightTypeOrderPriority(a.type) - getInsightTypeOrderPriority(b.type)
  );

  return (
    <s.InsightsContainer>
      {sortedInsights
        .map((x) => {
          const insightTypeInfo = getInsightTypeInfo(x.type);
          const tagType = getTagType(x.criticality);

          return insightTypeInfo ? (
            <Tag
              key={x.type}
              title={insightTypeInfo.label}
              icon={insightTypeInfo.icon}
              type={tagType}
            />
          ) : null;
        })
        .filter(Boolean)}
    </s.InsightsContainer>
  );
};

export const RecentActivityTable = (props: RecentActivityTableProps) => {
  const handleSpanLinkClick = (span: EntrySpan) => {
    props.onSpanLinkClick(span);
  };

  const handleTraceButtonClick = (traceId: string, span: EntrySpan) => {
    props.onTraceButtonClick(traceId, span);
  };

  const renderSpanLink = (span: EntrySpan) => (
    <s.SpanLinkContainer>
      <Tooltip title={span.displayText}>
        <s.SpanLink
          onClick={() => {
            handleSpanLinkClick(span);
          }}
        >
          {span.displayText}
        </s.SpanLink>
      </Tooltip>
      <s.StyledCopyButton text={span.displayText} />
    </s.SpanLinkContainer>
  );

  const renderSpanLinks = (entry: ActivityEntry) => (
    <s.SpanLinksContainer>
      {renderSpanLink(entry.firstEntrySpan)}
      {entry.lastEntrySpan && <> to {renderSpanLink(entry.lastEntrySpan)}</>}
    </s.SpanLinksContainer>
  );

  const renderTraceButton = (entry: ActivityEntry) => (
    <NewButton
      onClick={() => {
        handleTraceButtonClick(entry.latestTraceId, entry.firstEntrySpan);
      }}
      icon={TraceIcon}
      label={"Trace"}
    />
  );

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "recentActivity",
      header: "Asset",
      meta: {
        width: "60%",
        minWidth: 60
      },
      cell: (info) => {
        const entry = info.getValue();
        return (
          <>
            {isRecent(entry) && renderBadge()}
            {renderSpanLinks(entry)}
          </>
        );
      }
    }),
    columnHelper.accessor("latestTraceTimestamp", {
      header: "Executed",
      meta: {
        width: "10%",
        minWidth: 100
      },
      cell: (info) => <>{renderTimeDistance(info.getValue(), props.viewMode)}</>
    }),
    columnHelper.accessor("latestTraceDuration", {
      header: "Duration",
      meta: {
        width: "10%",
        minWidth: 100
      },
      cell: (info) => renderDuration(info.getValue(), props.viewMode)
    }),
    columnHelper.accessor("slimAggregatedInsights", {
      header: "Insights",
      meta: {
        width: "15%",
        minWidth: 60
      },
      cell: (info) => renderInsights(info.getValue())
    }),
    ...(props.isTraceButtonVisible
      ? [
          columnHelper.accessor((row) => row, {
            id: "latestTraceId",
            header: "Actions",
            meta: {
              width: 60
            },
            cell: (info) => renderTraceButton(info.getValue())
          })
        ]
      : [])
  ];

  const sortedData = useMemo(
    () =>
      [...props.data].sort(
        (a, b) =>
          new Date(b.latestTraceTimestamp).valueOf() -
          new Date(a.latestTraceTimestamp).valueOf()
      ),
    [props.data]
  );

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return props.viewMode === "table" ? (
    <s.Table>
      <s.TableHead $offset={props.headerHeight}>
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
                </s.TableHeaderCell>
              );
            })}
          </s.TableHeadRow>
        ))}
      </s.TableHead>
      <s.TableBody>
        {table.getRowModel().rows.map((row) => (
          <s.TableBodyRow key={row.id} $isRecent={isRecent(row.original)}>
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
  ) : (
    <s.ListContainer>
      <s.List>
        {sortedData.map((entry, i) => (
          <s.ListItem key={i} $isRecent={isRecent(entry)}>
            {isRecent(entry) && renderBadge()}
            {renderTimeDistance(entry.latestTraceTimestamp, props.viewMode)}
            {renderSpanLinks(entry)}
            {renderDuration(entry.latestTraceDuration, props.viewMode)}
            <s.ListInsightsContainer>
              {renderInsights(entry.slimAggregatedInsights)}
            </s.ListInsightsContainer>
            {props.isTraceButtonVisible && renderTraceButton(entry)}
          </s.ListItem>
        ))}
      </s.List>
    </s.ListContainer>
  );
};
