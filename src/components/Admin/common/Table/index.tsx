import { flexRender } from "@tanstack/react-table";
import type { ColumnMeta } from "../../../RecentActivity/RecentActivityTable/types";
import * as s from "./styles";
import type { TableProps } from "./types";

export const Table = <T,>({ table }: TableProps<T>) => (
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
                  width: meta.width,
                  minWidth: meta.minWidth,
                  textAlign: meta.textAlign
                }}
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
                style={{
                  width: meta.width,
                  minWidth: meta.minWidth
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
