import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { timeAgo } from "../../utils/timeAgo";
import { Button } from "../common/Button";
import { AlarmClockIcon } from "../common/icons/AlarmClockIcon";
import { BottleneckIcon } from "../common/icons/BottleneckIcon";
import { CrosshairIcon } from "../common/icons/CrosshairIcon";
import { MeterHighIcon } from "../common/icons/MeterHighIcon";
import { MeterLowIcon } from "../common/icons/MeterLowIcon";
import { MeterMediumIcon } from "../common/icons/MeterMediumIcon";
import { ScalesIcon } from "../common/icons/ScalesIcon";
import { SnailIcon } from "../common/icons/SnailIcon";
import { SpotIcon } from "../common/icons/SpotIcon";
import { WarningCircleIcon } from "../common/icons/WarningCircleIcon";
import { Link } from "../common/Link";
import { ActivityEntry, EntrySpan } from "../RecentActivity/types";
import * as s from "./styles";
import { INSIGHT_TYPES, RecentActivityTableProps } from "./types";

const insightsInfo: Record<string, { icon: JSX.Element; label: string }> = {
  [INSIGHT_TYPES.SpanUsageStatus]: {
    icon: <>N/A</>,
    label: "Span usage status"
  },
  [INSIGHT_TYPES.TopErrorFlows]: {
    icon: <WarningCircleIcon size={20} color={"#F93967"} />,
    label: "Top error flows"
  },
  [INSIGHT_TYPES.SpanDurationChange]: {
    icon: <AlarmClockIcon size={20} />,
    label: "Span duration change"
  },
  [INSIGHT_TYPES.HotSpot]: { icon: <SpotIcon size={20} />, label: "Hot spot" },
  [INSIGHT_TYPES.Errors]: {
    icon: <WarningCircleIcon size={20} />,
    label: "Errors"
  },
  [INSIGHT_TYPES.SlowEndpoint]: {
    icon: <SnailIcon size={20} />,
    label: "Slow endpoint"
  },
  [INSIGHT_TYPES.LowUsage]: {
    icon: <MeterLowIcon size={20} />,
    label: "Low usage"
  },
  [INSIGHT_TYPES.NormalUsage]: {
    icon: <MeterMediumIcon size={20} />,
    label: "Normal usage"
  },
  [INSIGHT_TYPES.HighUsage]: {
    icon: <MeterHighIcon size={20} color={"#F93967"} />,
    label: "High usage"
  },
  [INSIGHT_TYPES.SlowestSpans]: {
    icon: <SnailIcon size={20} />,
    label: "Slowest spans"
  },
  [INSIGHT_TYPES.EndpointSpaNPlusOne]: {
    icon: <>N/A</>,
    label: "Endpoint span N+1"
  },
  [INSIGHT_TYPES.SpanUsages]: { icon: <>N/A</>, label: "Span usages" },
  [INSIGHT_TYPES.SpaNPlusOne]: { icon: <>N/A</>, label: "Span N+1" },
  [INSIGHT_TYPES.SpanEndpointBottleneck]: {
    icon: <BottleneckIcon size={20} />,
    label: "Span endpoint bottleneck"
  },
  [INSIGHT_TYPES.SpanHighUsage]: {
    icon: <MeterHighIcon color={"#F93967"} size={20} />,
    label: "Span high usage"
  },
  [INSIGHT_TYPES.SpanDurations]: {
    icon: <AlarmClockIcon size={20} />,
    label: "Span durations"
  },
  [INSIGHT_TYPES.SpanScaling]: { icon: <ScalesIcon size={20} />, label: "" },
  [INSIGHT_TYPES.SpanScalingRootCause]: {
    icon: <ScalesIcon size={20} />,
    label: "Span scaling"
  },
  [INSIGHT_TYPES.SpanDurationBreakdown]: {
    icon: <AlarmClockIcon size={20} />,
    label: "Span duration breakdown"
  }
};

const columnHelper = createColumnHelper<ActivityEntry>();

export const RecentActivityTable = (props: RecentActivityTableProps) => {
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
              const insightInfo = insightsInfo[x.type];
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
            icon={<CrosshairIcon />}
            label={"Trace"}
          />
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
