import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { useTheme } from "styled-components";
import type { DefaultTheme } from "styled-components/dist/types";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../../utils/roundTo";
import { Tag } from "../../../../../../common/v3/Tag";
import type { Component, EndpointBreakdownInsight } from "../../../../../types";
import { ComponentType } from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { PercentileViewModeToggle } from "../common/InsightCard/PercentileViewModeToggle";
import * as s from "./styles";
import type { EndpointBreakdownInsightCardProps } from "./types";

const PIE_CHART_RADIUS = 50;
const PIE_CHART_ARC_WIDTH = 4;
const PIE_CHART_SIZE = PIE_CHART_RADIUS * 2 + PIE_CHART_ARC_WIDTH;
const STROKE_WIDTH = PIE_CHART_ARC_WIDTH / 2;
const DEFAULT_PERCENTILE = 0.5;

const getComponentTypeColors = (
  theme: DefaultTheme,
  componentType: ComponentType
): {
  fill: string;
  stroke: string;
} => {
  switch (componentType) {
    case ComponentType.Internal:
      return {
        fill: theme.colors.v3.pieChart.brightPurpleFill,
        stroke: theme.colors.v3.pieChart.brightPurpleStroke
      };
    case ComponentType.DbQueries:
      return {
        fill: theme.colors.v3.pieChart.pinkFill,
        stroke: theme.colors.v3.pieChart.pinkStroke
      };
    case ComponentType.HttpClients:
      return {
        fill: theme.colors.v3.pieChart.brightOrangeFill,
        stroke: theme.colors.v3.pieChart.brightOrangeStroke
      };

    case ComponentType.Rendering:
      return {
        fill: theme.colors.v3.pieChart.brightGreenFill,
        stroke: theme.colors.v3.pieChart.brightGreenStroke
      };
    case ComponentType.Cache:
      return {
        fill: theme.colors.v3.pieChart.brightRedFill,
        stroke: theme.colors.v3.pieChart.brightRedStroke
      };
    case ComponentType.Producer:
      return {
        fill: theme.colors.v3.pieChart.azureFill,
        stroke: theme.colors.v3.pieChart.azureStroke
      };
    default:
      return {
        fill: theme.colors.v3.surface.gray,
        stroke: theme.colors.v3.surface.primary
      };
  }
};

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

export const EndpointBreakdownInsightCard = ({
  insight,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: EndpointBreakdownInsightCardProps) => {
  const theme = useTheme();

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
        <PieChart width={PIE_CHART_SIZE} height={PIE_CHART_SIZE}>
          <Pie
            data={data}
            innerRadius={PIE_CHART_RADIUS - PIE_CHART_ARC_WIDTH}
            outerRadius={PIE_CHART_RADIUS}
            cornerRadius={PIE_CHART_ARC_WIDTH / 2}
            strokeWidth={STROKE_WIDTH}
            paddingAngle={4}
            dataKey={"fraction"}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell
                key={entry.type}
                fill={getComponentTypeColors(theme, entry.type).fill}
                stroke={getComponentTypeColors(theme, entry.type).stroke}
              />
            ))}
          </Pie>
        </PieChart>
      </s.PieChartContainer>
      <s.Legend>
        {data.map((x) => (
          <s.LegendItem key={x.type}>
            <s.LegendItemDataColorBadge
              $colors={{
                background: getComponentTypeColors(theme, x.type).fill,
                border: getComponentTypeColors(theme, x.type).stroke
              }}
            />
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
        return <s.CategoryName>{category}</s.CategoryName>;
      }
    }),
    columnHelper.accessor("duration", {
      id: "duration",
      header: "Request Time",
      cell: (info) => {
        const duration = info.getValue();
        const value = duration && maxDuration ? duration.raw / maxDuration : 0;
        const durationString = duration ? getDurationString(duration) : "";

        return (
          <s.RequestTimeContainer>
            <s.FractionProgressBar>
              <s.FractionProgressBarValue $value={value} />
            </s.FractionProgressBar>
            {duration && (
              <Tag
                title={durationString}
                type={"highlight"}
                content={durationString}
              />
            )}
          </s.RequestTimeContainer>
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <s.TableBodyRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <s.TableBodyCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </s.TableBodyCell>
            ))}
          </s.TableBodyRow>
        ))}
      </tbody>
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
          {insight.hasAsyncSpans ? renderTable() : renderPieChart()}
        </s.Container>
      }
      isAsync={insight.hasAsyncSpans}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
