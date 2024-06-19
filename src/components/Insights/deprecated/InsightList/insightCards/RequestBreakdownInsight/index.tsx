import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { roundTo } from "../../../../../../utils/roundTo";
import {
  Component,
  ComponentType,
  EndpointBreakdownInsight
} from "../../../../types";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import { RequestBreakdownInsightProps } from "./types";

const PIE_CHART_RADIUS = 42;
const PIE_CHART_ARC_WIDTH = 4;

const componentTypeColors = {
  [ComponentType.Internal]: "#53aeb4",
  [ComponentType.DbQueries]: "#b180d7",
  [ComponentType.HttpClients]: "#75beff",
  [ComponentType.Rendering]: "#f55385",
  [ComponentType.Cache]: "#f68d8d",
  [ComponentType.Producer]: "#8df8b7"
};

const DEFAULT_PERCENTILE = 0.5;

const getComponents = (
  insight: EndpointBreakdownInsight,
  percentile: number
): Component[] => {
  switch (percentile) {
    case 0.5:
      return insight.p50Components;
    case 0.95:
      return insight.p95Components;
    default:
      return [];
  }
};

const sortByType = (a: Component, b: Component) =>
  String(a.type).localeCompare(String(b.type));

const columnHelper = createColumnHelper<Component>();

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const RequestBreakdownInsight = ({
  insight,
  onRecalculate,
  onRefresh
}: RequestBreakdownInsightProps) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);

  const data = useMemo(() => {
    const components = getComponents(insight, percentileViewMode);

    const sortedComponents = insight.hasAsyncSpans
      ? [...components].sort((a, b) =>
          a.duration && b.duration
            ? a.duration.raw - b.duration.raw
            : sortByType(a, b)
        )
      : [...components].sort(
          (a, b) => b.fraction - a.fraction || sortByType(a, b)
        );

    return sortedComponents;
  }, [insight, percentileViewMode]);

  const handlePercentileViewModeChange = (value: number) => {
    setPercentileViewMode(value);
  };

  const renderPieChart = () => (
    <s.ContentContainer>
      <s.PieChartContainer>
        <PieChart width={PIE_CHART_RADIUS} height={PIE_CHART_RADIUS}>
          <Pie
            data={data}
            innerRadius={(PIE_CHART_RADIUS - PIE_CHART_ARC_WIDTH) / 2}
            outerRadius={PIE_CHART_RADIUS / 2}
            cornerRadius={PIE_CHART_ARC_WIDTH / 2}
            paddingAngle={1}
            dataKey={"fraction"}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell
                key={entry.type}
                fill={componentTypeColors[entry.type]}
                stroke={"none"}
              />
            ))}
          </Pie>
        </PieChart>
      </s.PieChartContainer>
      <s.Legend>
        {data.map((x) => (
          <s.LegendItem key={x.type}>
            <s.LegendItemDataColor $color={componentTypeColors[x.type]} />
            <s.LegendItemDataLabel>{x.type}</s.LegendItemDataLabel>
            <s.LegendItemDataValue>
              {roundTo(x.fraction * 100, 2)}%
            </s.LegendItemDataValue>
          </s.LegendItem>
        ))}
      </s.Legend>
    </s.ContentContainer>
  );

  const maxDuration = data.reduce(
    (acc, cur) =>
      cur.duration && cur.duration.raw > acc ? cur.duration.raw : acc,
    0
  );

  const columns = [
    columnHelper.accessor("type", {
      header: "Category",
      cell: (info) => {
        const category = info.getValue();
        return <span>{category}</span>;
      }
    }),
    columnHelper.accessor("duration", {
      id: "requestTime",
      header: "Request Time",
      cell: (info) => {
        const duration = info.getValue();
        const value = duration && maxDuration ? duration.raw / maxDuration : 0;
        return (
          <s.FractionProgressBarContainer>
            <s.FractionProgressBar>
              <s.FractionProgressBarValue $value={value} />
            </s.FractionProgressBar>
          </s.FractionProgressBarContainer>
        );
      }
    }),
    columnHelper.accessor("duration", {
      id: "duration",
      header: "",
      cell: (info) => {
        const duration = info.getValue();
        return (
          <s.DurationContainer>
            {duration?.value}
            <s.Suffix>{duration?.unit}</s.Suffix>
          </s.DurationContainer>
        );
      }
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const renderTable = () => (
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <s.TableBodyCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </s.TableBodyCell>
            ))}
          </tr>
        ))}
      </s.TableBody>
    </s.Table>
  );

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={insight.hasAsyncSpans ? renderTable() : renderPieChart()}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onPercentileViewModeChange={
        insight.p50Components && insight.p95Components
          ? handlePercentileViewModeChange
          : undefined
      }
      isAsync={insight.hasAsyncSpans}
    />
  );
};
