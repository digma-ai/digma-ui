import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { DefaultTheme, useTheme } from "styled-components";
import { Duration } from "../../../globals";
import { timeAgo } from "../../../utils/timeAgo";
import { Badge } from "../../common/Badge";
import { Button } from "../../common/Button";
import { BottleneckIcon } from "../../common/icons/BottleneckIcon";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { MeterHighIcon } from "../../common/icons/MeterHighIcon";
import { SQLDatabaseIcon } from "../../common/icons/SQLDatabaseIcon";
import { ScalesIcon } from "../../common/icons/ScalesIcon";
import { SnailIcon } from "../../common/icons/SnailIcon";
import { SpotIcon } from "../../common/icons/SpotIcon";
import { ViewMode } from "../EnvironmentPanel/types";
import { ActivityEntry, EntrySpan, SlimInsight } from "../types";
import { SpanLink } from "./SpanLink";
import * as s from "./styles";
import { INSIGHT_TYPES, RecentActivityTableProps } from "./types";

const getInsightInfo = (
  type: string,
  theme: DefaultTheme
): { icon: JSX.Element; label: string } | undefined => {
  const insightInfoMap: Record<string, { icon: JSX.Element; label: string }> = {
    [INSIGHT_TYPES.HotSpot]: {
      icon: <SpotIcon size={20} />,
      label: "Error Hotspot"
    },
    [INSIGHT_TYPES.SlowEndpoint]: {
      icon: <SnailIcon size={20} />,
      label: "Slow Endpoint"
    },
    [INSIGHT_TYPES.HighUsage]: {
      icon: (
        <MeterHighIcon
          size={20}
          color={theme.mode === "light" ? "#e00036" : "#f93967"}
        />
      ),
      label: "Endpoint High Traffic"
    },
    [INSIGHT_TYPES.SlowestSpans]: {
      icon: <BottleneckIcon size={20} />,
      label: "Span Bottleneck"
    },
    [INSIGHT_TYPES.EndpointSpaNPlusOne]: {
      icon: <SQLDatabaseIcon size={20} />,
      label: "Suspected N-Plus-1"
    },
    [INSIGHT_TYPES.SpaNPlusOne]: {
      icon: <SQLDatabaseIcon size={20} />,
      label: "Suspected N-Plus-1"
    },
    [INSIGHT_TYPES.SpanEndpointBottleneck]: {
      icon: <BottleneckIcon size={20} />,
      label: "Bottleneck"
    },
    [INSIGHT_TYPES.SpanScaling]: {
      icon: <ScalesIcon size={20} />,
      label: "Scaling Issue Found"
    },
    [INSIGHT_TYPES.SpanScalingRootCause]: {
      icon: <ScalesIcon size={20} />,
      label: "Scaling Issue Root Cause Found"
    }
  };

  return insightInfoMap[type];
};

const columnHelper = createColumnHelper<ActivityEntry>();

export const isRecent = (entry: ActivityEntry): boolean => {
  const MAX_DISTANCE =
    typeof window.recentActivityExpirationLimit === "number"
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
    <SpanLink
      key={span.spanCodeObjectId}
      onClick={() => {
        handleSpanLinkClick(span, environment);
      }}
      text={span.displayText}
    />
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

  const renderInsights = (insights: SlimInsight[]) => (
    <s.InsightsContainer>
      {insights
        .map((x) => {
          const insightInfo = getInsightInfo(x.type, theme);
          return insightInfo ? (
            <span title={insightInfo.label} key={x.type}>
              {insightInfo.icon}
            </span>
          ) : null;
        })
        .filter(Boolean)}
    </s.InsightsContainer>
  );

  const renderTraceButton = (entry: ActivityEntry) => (
    <s.TraceButtonContainer>
      <Button
        onClick={() => {
          handleTraceButtonClick(entry.latestTraceId, entry.firstEntrySpan);
        }}
        icon={CrosshairIcon}
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

  const table = useReactTable({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return props.viewMode === "table" ? (
    <s.Table>
      <s.TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <s.TableHeaderRow key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </s.TableHeaderRow>
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
        {props.data.map((entry, i) => (
          <s.ListItem key={i}>
            {isRecent(entry) && (
              <s.ListBadgeContainer>
                <Badge />
              </s.ListBadgeContainer>
            )}
            {renderTimeDistance(entry.latestTraceTimestamp, props.viewMode)}
            {renderSpanLinks(entry)}
            {renderDuration(entry.latestTraceDuration, props.viewMode)}
            {renderInsights(entry.slimAggregatedInsights)}
            {props.isTraceButtonVisible && renderTraceButton(entry)}
          </s.ListItem>
        ))}
      </s.List>
    </s.ListContainer>
  );
};
