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
import { INSIGHT_TYPES } from "./types";

const INSIGHT_ICONS: Record<string, JSX.Element> = {
  [INSIGHT_TYPES.SpanUsageStatus]: <>N/A</>,
  [INSIGHT_TYPES.TopErrorFlows]: (
    <WarningCircleIcon size={20} color={"#F93967"} />
  ),
  [INSIGHT_TYPES.SpanDurationChange]: <AlarmClockIcon size={20} />,
  [INSIGHT_TYPES.HotSpot]: <SpotIcon size={20} />,
  [INSIGHT_TYPES.Errors]: <WarningCircleIcon size={20} />,
  [INSIGHT_TYPES.SlowEndpoint]: <SnailIcon size={20} />,
  [INSIGHT_TYPES.LowUsage]: <MeterLowIcon size={20} />,
  [INSIGHT_TYPES.NormalUsage]: <MeterMediumIcon size={20} />,
  [INSIGHT_TYPES.HighUsage]: <MeterHighIcon size={20} color={"#F93967"} />,
  [INSIGHT_TYPES.SlowestSpans]: <SnailIcon size={20} />,
  [INSIGHT_TYPES.EndpointSpaNPlusOne]: <>N/A</>,
  [INSIGHT_TYPES.SpanUsages]: <>N/A</>,
  [INSIGHT_TYPES.SpaNPlusOne]: <>N/A</>,
  [INSIGHT_TYPES.SpanEndpointBottleneck]: <BottleneckIcon size={20} />,
  [INSIGHT_TYPES.SpanHighUsage]: <MeterHighIcon color={"#F93967"} size={20} />,
  [INSIGHT_TYPES.SpanDurations]: <AlarmClockIcon size={20} />,
  [INSIGHT_TYPES.SpanScaling]: <ScalesIcon size={20} />,
  [INSIGHT_TYPES.SpanScalingRootCause]: <ScalesIcon size={20} />,
  [INSIGHT_TYPES.SpanDurationBreakdown]: <AlarmClockIcon size={20} />
};

const columnHelper = createColumnHelper<ActivityEntry>();

const renderSpanLink = (span: EntrySpan) => (
  <Link
    key={span.spanCodeObjectId}
    onClick={() => {
      console.log(span.displayText);
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
          {info.getValue().map((x) => (
            <span key={x.type}> {INSIGHT_ICONS[x.type]}</span>
          ))}
        </>
      );
    }
  }),
  columnHelper.accessor("latestTraceId", {
    header: "",
    cell: (info) => (
      <s.TraceButtonContainer>
        <Button
          onClick={() => {
            console.log(info.getValue());
          }}
          icon={<CrosshairIcon />}
          label={"Trace"}
        />
      </s.TraceButtonContainer>
    )
  })
];

type RecentActivityTableProps = { data: ActivityEntry[] };

export const RecentActivityTable = (props: RecentActivityTableProps) => {
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
