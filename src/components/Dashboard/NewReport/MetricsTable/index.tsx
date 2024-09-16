import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ServiceData } from "../types";
import * as s from "./styles";
import { ColumnMeta, MetricsTableProps } from "./types";

export const MetricsTable = ({ data }: MetricsTableProps) => {
  const columnHelper = createColumnHelper<ServiceData>();
  const columns = [
    columnHelper.accessor((row) => row.key.service, {
      header: "Service",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor((row) => row.key.environment, {
      header: "Environment",
      cell: (info) => info.getValue(),
      meta: {
        contentAlign: "center"
      }
    }),
    columnHelper.accessor((row) => row.issues, {
      header: "Issues",
      cell: (info) => info.getValue(),
      meta: {
        contentAlign: "center"
      }
    }),
    columnHelper.accessor((row) => row.impact, {
      header: "Impact",
      cell: (info) => info.getValue(),
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

              return (
                <s.TableBodyCell key={cell.id}>
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
