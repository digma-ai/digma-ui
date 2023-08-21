import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useTheme } from "styled-components";
import { Duration } from "../../../globals";
import { isNumber } from "../../../typeGuards/isNumber";
import { getInsightImportanceColor } from "../../../utils/getInsightImportanceColor";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../utils/getInsightTypeOrderPriority";
import { timeAgo } from "../../../utils/timeAgo";
import { Badge } from "../../common/Badge";
import { Button } from "../../common/Button";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { ViewMode } from "../EnvironmentPanel/types";
import { ActivityEntry, EntrySpan, SlimInsight } from "../types";
import * as s from "./styles";
import { RecentActivityTableProps } from "./types";

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

export const RecentActivityTable = (props: RecentActivityTableProps) => {
  const theme = useTheme();

  const handleSpanLinkClick = (span: EntrySpan, environment: string) => {
    props.onSpanLinkClick(span, environment);
  };

  const handleTraceButtonClick = (traceId: string, span: EntrySpan) => {
    props.onTraceButtonClick(traceId, span);
  };

  const renderSpanLink = (span: EntrySpan, environment: string) => (
    <s.SpanLink
      key={span.spanCodeObjectId}
      onClick={() => {
        handleSpanLinkClick(span, environment);
      }}
    >
      {span.displayText}
    </s.SpanLink>
  );

  const renderSpanLinks = (entry: ActivityEntry) => (
    <span>
      {renderSpanLink(entry.firstEntrySpan, entry.environment)}
      {entry.lastEntrySpan && (
        <> to {renderSpanLink(entry.lastEntrySpan, entry.environment)}</>
      )}
    </span>
  );

  const renderTimeDistance = (timestamp: string, viewMode: ViewMode) =>
    viewMode === "table" ? (
      <s.TimeDistanceContainer>
        {timeAgo(timestamp)}
        <s.Suffix>ago</s.Suffix>
      </s.TimeDistanceContainer>
    ) : (
      <span>
        {timeAgo(timestamp)}
        <s.ListSuffix>ago</s.ListSuffix>
      </span>
    );

  const renderDuration = (duration: Duration, viewMode: ViewMode) =>
    viewMode === "table" ? (
      <s.DurationContainer>
        {duration.value}
        <s.Suffix>{duration.unit}</s.Suffix>
      </s.DurationContainer>
    ) : (
      <span>
        {duration.value}
        <s.ListSuffix>{duration.unit}</s.ListSuffix>
      </span>
    );

  const renderInsights = (insights: SlimInsight[]) => {
    const sortedInsights = [...insights].sort(
      (a, b) =>
        a.importance - b.importance ||
        getInsightTypeOrderPriority(a.type) -
          getInsightTypeOrderPriority(b.type)
    );

    return (
      <s.InsightsContainer>
        {sortedInsights
          .map((x) => {
            const insightTypeInfo = getInsightTypeInfo(x.type);
            const iconColor = getInsightImportanceColor(x.importance, theme);

            return insightTypeInfo ? (
              <Tooltip key={x.type} title={insightTypeInfo.label}>
                <s.InsightIconContainer>
                  <insightTypeInfo.icon color={iconColor} size={16} />
                </s.InsightIconContainer>
              </Tooltip>
            ) : null;
          })
          .filter(Boolean)}
      </s.InsightsContainer>
    );
  };

  const renderTraceButton = (entry: ActivityEntry) => (
    <s.TraceButtonContainer>
      <Button
        onClick={() => {
          handleTraceButtonClick(entry.latestTraceId, entry.firstEntrySpan);
        }}
        icon={{
          component: CrosshairIcon
        }}
      >
        Trace
      </Button>
    </s.TraceButtonContainer>
  );

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "recentActivity",
      header: "Recent Activity",
      cell: (info) => {
        const entry = info.getValue();
        return (
          <>
            {isRecent(entry) && (
              <s.BadgeContainer>
                <Badge />
              </s.BadgeContainer>
            )}
            {renderSpanLinks(entry)}
          </>
        );
      }
    }),
    columnHelper.accessor("latestTraceTimestamp", {
      header: "Executed",
      cell: (info) => <>{renderTimeDistance(info.getValue(), props.viewMode)}</>
    }),
    columnHelper.accessor("latestTraceDuration", {
      header: "Duration",
      cell: (info) => renderDuration(info.getValue(), props.viewMode)
    }),
    columnHelper.accessor("slimAggregatedInsights", {
      header: "Insights",
      cell: (info) => renderInsights(info.getValue())
    }),
    ...(props.isTraceButtonVisible
      ? [
          columnHelper.accessor((row) => row, {
            id: "latestTraceId",
            header: "",
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
      <s.TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <s.TableHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </s.TableHeaderCell>
            ))}
          </tr>
        ))}
      </s.TableHead>
      <s.TableBody>
        {table.getRowModel().rows.map((row) => (
          <s.TableBodyRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <s.TableBodyCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </s.TableBodyCell>
            ))}
          </s.TableBodyRow>
        ))}
      </s.TableBody>
    </s.Table>
  ) : (
    <s.ListContainer>
      <s.ListHeader>Recent Activity</s.ListHeader>
      <s.List>
        {sortedData.map((entry, i) => (
          <s.ListItem key={i}>
            {isRecent(entry) && (
              <s.ListBadgeContainer>
                <Badge />
              </s.ListBadgeContainer>
            )}
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
