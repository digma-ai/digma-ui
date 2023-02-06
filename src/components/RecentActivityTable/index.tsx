import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { DefaultTheme, useTheme } from "styled-components";
import { timeAgo } from "../../utils/timeAgo";
import { Button } from "../common/Button";
import { AlarmClockIcon } from "../common/icons/AlarmClockIcon";
import { BottleneckIcon } from "../common/icons/BottleneckIcon";
import { CrosshairIcon } from "../common/icons/CrosshairIcon";
import { MeterHighIcon } from "../common/icons/MeterHighIcon";
import { MeterLowIcon } from "../common/icons/MeterLowIcon";
import { MeterMediumIcon } from "../common/icons/MeterMediumIcon";
import { ScalesIcon } from "../common/icons/ScalesIcon";
import { SineIcon } from "../common/icons/SineIcon";
import { SnailIcon } from "../common/icons/SnailIcon";
import { SpotIcon } from "../common/icons/SpotIcon";
import { WarningCircleIcon } from "../common/icons/WarningCircleIcon";
import { Link } from "../common/Link";
import { ActivityEntry, EntrySpan } from "../RecentActivity/types";
import * as s from "./styles";
import { INSIGHT_TYPES, RecentActivityTableProps } from "./types";

const getInsightInfo = (
  type: string,
  theme: DefaultTheme
): { icon: JSX.Element; label: string } => {
  const insightInfoMap: Record<string, { icon: JSX.Element; label: string }> = {
    [INSIGHT_TYPES.SpanUsageStatus]: {
      icon: <>N/A</>,
      label: ""
    },
    [INSIGHT_TYPES.TopErrorFlows]: {
      icon: <>N/A</>,
      label: "New and Trending Errors"
    },
    [INSIGHT_TYPES.SpanDurationChange]: {
      icon: <>N/A</>,
      label: "Performance changes"
    },
    [INSIGHT_TYPES.HotSpot]: {
      icon: <SpotIcon size={20} />,
      label: "Error hotspot"
    },
    [INSIGHT_TYPES.Errors]: {
      icon: (
        <WarningCircleIcon
          size={20}
          color={theme.mode === "light" ? "#e00036" : "#f93967"}
        />
      ),
      label: "Errors"
    },
    [INSIGHT_TYPES.SlowEndpoint]: {
      icon: <SnailIcon size={20} />,
      label: "Slow Endpoint"
    },
    [INSIGHT_TYPES.LowUsage]: {
      icon: (
        <MeterLowIcon
          size={20}
          color={theme.mode === "light" ? "#1dc693" : "#a7f4c1"}
        />
      ),
      label: "Endpoint low traffic"
    },
    [INSIGHT_TYPES.NormalUsage]: {
      icon: (
        <MeterMediumIcon
          size={20}
          color={theme.mode === "light" ? "#e06c00" : "#ff810d"}
        />
      ),
      label: "Endpoint normal level of traffic"
    },
    [INSIGHT_TYPES.HighUsage]: {
      icon: (
        <MeterHighIcon
          size={20}
          color={theme.mode === "light" ? "#e00036" : "#f93967"}
        />
      ),
      label: "Endpoint high traffic"
    },
    [INSIGHT_TYPES.SlowestSpans]: {
      icon: <BottleneckIcon size={20} />,
      label: "Span Bottleneck"
    },
    [INSIGHT_TYPES.EndpointSpaNPlusOne]: {
      icon: <>N/A</>,
      label: "Suspected N-Plus-1"
    },
    [INSIGHT_TYPES.SpanUsages]: {
      icon: <SineIcon size={20} />,
      label: "Top Usage"
    },
    [INSIGHT_TYPES.SpaNPlusOne]: {
      icon: <>N/A</>,
      label: "Suspected N-Plus-1"
    },
    [INSIGHT_TYPES.SpanEndpointBottleneck]: {
      icon: <BottleneckIcon size={20} />,
      label: "Bottleneck"
    },
    [INSIGHT_TYPES.SpanHighUsage]: {
      icon: <>N/A</>,
      label: ""
    },
    [INSIGHT_TYPES.SpanDurations]: {
      icon: <AlarmClockIcon size={20} />,
      label: "Duration"
    },
    [INSIGHT_TYPES.SpanScaling]: {
      icon: <ScalesIcon size={20} />,
      label: "Scaling Issue Found"
    },
    [INSIGHT_TYPES.SpanScalingRootCause]: {
      icon: <>N/A</>,
      label: ""
    },
    [INSIGHT_TYPES.SpanDurationBreakdown]: {
      icon: <AlarmClockIcon size={20} />,
      label: "Duration Breakdown"
    }
  };

  return insightInfoMap[type];
};

const columnHelper = createColumnHelper<ActivityEntry>();

export const isRecent = (entry: ActivityEntry): boolean => {
  const MAX_DISTANCE = 10 * 60 * 1000; // in milliseconds
  const now = new Date();
  return (
    now.valueOf() - new Date(entry.latestTraceTimestamp).valueOf() <=
    MAX_DISTANCE
  );
};

export const RecentActivityTable = (props: RecentActivityTableProps) => {
  const theme = useTheme();

  const handleSpanLinkClick = (span: EntrySpan) => {
    props.onSpanLinkClick(span);
  };

  const handleTraceButtonClick = (traceId: string, span: EntrySpan) => {
    props.onTraceButtonClick(traceId, span);
  };

  const renderSpanLink = (span: EntrySpan) => (
    <Link
      key={span.spanCodeObjectId}
      onClick={() => {
        handleSpanLinkClick(span);
      }}
      text={span.displayText}
    />
  );

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "recentActivity",
      header: () => "Recent Activity",
      cell: (info) => {
        const value = info.getValue();
        const firstSpan = value.firstEntrySpan;
        const lastSpan = value.lastEntrySpan;

        return (
          <>
            {renderSpanLink(firstSpan)}
            {lastSpan && <> to {renderSpanLink(lastSpan)}</>}
          </>
        );
      }
    }),
    columnHelper.accessor("latestTraceTimestamp", {
      header: () => "Executed",
      cell: (info) => (
        <span>
          {timeAgo(info.getValue())}
          <s.Suffix> Ago</s.Suffix>
        </span>
      )
    }),
    columnHelper.accessor("latestTraceDuration", {
      header: () => <span>Duration</span>,
      cell: (info) => {
        const value = info.getValue();
        if (!value) {
          return "N/A";
        }

        return (
          <span>
            {value.value}
            <s.Suffix> {value.unit}</s.Suffix>
          </span>
        );
      }
    }),
    columnHelper.accessor("slimAggregatedInsights", {
      header: () => <span>Insights</span>,
      cell: (info) => {
        return (
          <>
            {info.getValue().map((x) => {
              const insightInfo = getInsightInfo(x.type, theme);
              return (
                <span title={insightInfo.label} key={x.type}>
                  {" "}
                  {insightInfo.icon}
                </span>
              );
            })}
          </>
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      id: "latestTraceId",
      header: "",
      cell: (info) => (
        <s.TraceButtonContainer>
          <Button
            onClick={() => {
              const value = info.getValue();
              handleTraceButtonClick(value.latestTraceId, value.firstEntrySpan);
            }}
            icon={CrosshairIcon}
          >
            Trace
          </Button>
        </s.TraceButtonContainer>
      )
    })
  ];

  const table = useReactTable({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <s.Table>
      <s.Head>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <s.ColumnHeader key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </s.ColumnHeader>
            ))}
          </tr>
        ))}
      </s.Head>
      <s.TableBody>
        {table.getRowModel().rows.map((row) => (
          <s.DataRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <s.DataCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </s.DataCell>
            ))}
          </s.DataRow>
        ))}
      </s.TableBody>
    </s.Table>
  );
};
