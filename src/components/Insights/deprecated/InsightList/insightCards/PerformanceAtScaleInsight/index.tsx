import { Button } from "../../../../../common/Button";
import { ChartIcon } from "../../../../../common/icons/ChartIcon";
import { InsightCard } from "../../InsightCard";
import type { PerformanceAtScaleInsightProps } from "./types";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import type { Duration } from "../../../../../../redux/services/types";
import { formatUnit } from "../../../../../../utils/formatUnit";
import type { Concurrency } from "../../../../types";
import * as s from "./styles";

const MIN_CONCURRENCY_STATES_TO_EVALUATE_SCALE = 4;

/**
 * @deprecated
 * safe to delete after the implementation of the version with new UI
 */
export const PerformanceAtScaleInsight = ({
  insight,
  onHistogramButtonClick,
  onRecalculate,
  onRefresh
}: PerformanceAtScaleInsightProps) => {
  const columnHelper = createColumnHelper<Concurrency>();

  const renderDuration = (duration: Duration) => (
    <s.DurationContainer>
      {duration.value}
      <s.Suffix>{duration.unit}</s.Suffix>
    </s.DurationContainer>
  );

  const columns = [
    columnHelper.accessor("calls", {
      header: "",
      cell: (info) => {
        const callNumber = info.getValue();

        return (
          <>
            At {callNumber} {formatUnit(callNumber, "call")} per second
          </>
        );
      }
    }),
    columnHelper.accessor("meanDuration", {
      header: "Mean",
      cell: (info) => renderDuration(info.getValue())
    })
  ];

  const table = useReactTable({
    data: insight.concurrencies,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const handleHistogramButtonClick = () => {
    if (insight.spanInfo) {
      onHistogramButtonClick(
        insight.spanInfo.spanCodeObjectId,
        insight.type,
        insight.spanInfo.displayName
      );
    }
  };

  return (
    <InsightCard
      key={insight.type}
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <div>
          Run at{" "}
          {MIN_CONCURRENCY_STATES_TO_EVALUATE_SCALE -
            insight.concurrencies.length}{" "}
          more concurrently states to scale evaluations
        </div>
      }
      expandableContent={
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
      }
      buttons={[
        ...(insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>
            ]
          : [])
      ]}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
