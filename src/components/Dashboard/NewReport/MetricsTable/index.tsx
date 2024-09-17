import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  sortingFns,
  useReactTable
} from "@tanstack/react-table";
import { ServiceData } from "../types";
import { getRank } from "../utils";
import * as s from "./styles";
import { ColumnMeta, MetricsTableProps, Severity } from "./types";

export const MetricsTable = ({ data, showSign }: MetricsTableProps) => {
  const columnHelper = createColumnHelper<ServiceData>();
  const maxImpact = Math.max(...data.map((x) => x.impact));

  const columns = [
    columnHelper.accessor((row) => row.key.service, {
      header: "Service",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor((row) => row.issues, {
      header: "Critical issues",
      cell: (info) => {
        const value = info.getValue();
        if (!showSign) {
          return value;
        }

        return `${value > 0 ? "+" : ""}${value}`;
      },
      sortingFn: sortingFns.alphanumeric,
      meta: {
        contentAlign: "center"
      }
    }),
    columnHelper.accessor((row) => row.impact, {
      header: "Impact",
      cell: (info) => Math.round(info.getValue() * 100),
      sortingFn: sortingFns.alphanumeric,
      meta: {
        contentAlign: "center"
      }
    }),
    columnHelper.accessor((row) => getRank(maxImpact, row.impact), {
      header: "Rank",
      cell: (info) => {
        return info.getValue();
      },
      sortingFn: sortingFns.alphanumeric,
      meta: {
        contentAlign: "center"
      }
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <s.Table>
      <s.TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta as
                | ColumnMeta
                | undefined;

              return (
                <s.TableHeaderCell key={header.id}>
                  <s.TableHeaderCellContent $align={meta?.contentAlign}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </s.TableHeaderCellContent>
                </s.TableHeaderCell>
              );
            })}
          </tr>
        ))}
      </s.TableHead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <s.TableBodyRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as ColumnMeta | undefined;
              const severity =
                cell.column.columnDef.header === "Rank"
                  ? (cell.getValue() as Severity)
                  : null;
              return (
                <s.TableBodyCell key={cell.id} $severity={severity}>
                  <s.TableCellContent $align={meta?.contentAlign}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </s.TableCellContent>
                </s.TableBodyCell>
              );
            })}
          </s.TableBodyRow>
        ))}
      </tbody>
    </s.Table>
  );
};
