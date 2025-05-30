import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import * as s from "./styles";
import type { ColumnMeta, TableProps } from "./types";

export const Table = <T,>({ data, columns }: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <s.Table>
      <s.TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <s.TableHeadRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta as ColumnMeta;

              return (
                <s.TableHeaderCell
                  key={header.id}
                  style={{
                    width: meta.width
                  }}
                  $align={meta.textAlign}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </s.TableHeaderCell>
              );
            })}
          </s.TableHeadRow>
        ))}
      </s.TableHead>
      <s.TableBody>
        {table.getRowModel().rows.map((row) => (
          <s.TableBodyRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as ColumnMeta;

              return (
                <s.TableBodyCell
                  key={cell.id}
                  $align={meta.textAlign}
                  style={{
                    width: meta.width
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </s.TableBodyCell>
              );
            })}
          </s.TableBodyRow>
        ))}
      </s.TableBody>
    </s.Table>
  );
};
