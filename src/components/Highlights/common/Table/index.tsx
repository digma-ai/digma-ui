import type { Row } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { usePagination } from "../../../../hooks/usePagination";
import { usePrevious } from "../../../../hooks/usePrevious";
import { isNumber } from "../../../../typeGuards/isNumber";
import { Info } from "../../../common/v3/Info";
import { Pagination } from "../../../common/v3/Pagination";
import * as s from "./styles";
import type { ColumnMeta, TableProps } from "./types";

const PAGE_SIZE = 5;

export const Table = <T,>({ columns, data, id, onRowClick }: TableProps<T>) => {
  const [tableData, setTableData] = useState({
    pageItems: data.slice(0, PAGE_SIZE)
  });
  const [pageItems, page, setPage] = usePagination(data, PAGE_SIZE, id);
  const previousPage = usePrevious(page);
  const previousId = usePrevious(id);

  // Keep pageItems in state to avoid table infinite re-rendering
  // More info: https://github.com/TanStack/table/issues/4614
  useEffect(() => {
    if (
      Boolean(previousId && previousId !== id) ||
      (isNumber(previousPage) && previousPage !== page)
    ) {
      setTableData({ pageItems });
    }
  }, [previousId, id, data, previousPage, page, pageItems]);

  const table = useReactTable({
    data: tableData.pageItems,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const handleTableBodyRowClick = (row: Row<T>) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <>
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
                      {meta?.info && <Info title={meta.info} />}
                    </s.TableHeaderCellContent>
                  </s.TableHeaderCell>
                );
              })}
            </tr>
          ))}
        </s.TableHead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <s.TableBodyRow
              key={row.id}
              onClick={() => handleTableBodyRowClick(row)}
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta as
                  | ColumnMeta
                  | undefined;

                return (
                  <s.TableBodyCell key={cell.id}>
                    <s.TableCellContent $align={meta?.contentAlign}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </s.TableCellContent>
                  </s.TableBodyCell>
                );
              })}
            </s.TableBodyRow>
          ))}
        </tbody>
      </s.Table>
      <Pagination
        itemsCount={data.length}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        withDescription={true}
      />
    </>
  );
};
