import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  useReactTable
} from "@tanstack/react-table";

import { ReactNode, useState } from "react";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { SortIcon } from "../../../common/icons/16px/SortIcon";
import { SORTING_ORDER } from "../../../common/SortingSelector/types";
import { trackingEvents } from "../tracking";
import { ServiceData } from "../types";
import { getSeverity } from "../utils";
import * as s from "./styles";
import { ColumnMeta, MetricsTableProps, Severity } from "./types";

const sortImpactFn: SortingFn<ServiceData> = (rowA, rowB) => {
  const impactA = rowA.original.impact;
  const impactB = rowB.original.impact;

  return impactA - impactB;
};

const sortIssuesFn: SortingFn<ServiceData> = (rowA, rowB) => {
  const issuesA = rowA.original.issues;
  const issuesB = rowB.original.issues;

  return issuesA - issuesB;
};

const IssuesLink = ({
  children,
  onClick
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <s.IssuesLinkContainer
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <s.SeeIssuesLink>See issues</s.SeeIssuesLink>
      ) : (
        <span>{children}</span>
      )}
    </s.IssuesLinkContainer>
  );
};

export const MetricsTable = ({
  data,
  showSign,
  onServiceSelected
}: MetricsTableProps) => {
  const columnHelper = createColumnHelper<ServiceData>();
  const minImpact = Math.min(...data.map((x) => x.impact));
  const maxImpact = Math.max(...data.map((x) => x.impact));

  const handleSeeIssuesLinkClick = (service: string, source: string) => {
    onServiceSelected(service);
    sendUserActionTrackingEvent(trackingEvents.TABLE_SEE_ISSUES_LINK_CLICKED, {
      source
    });
  };

  const columns = [
    columnHelper.accessor((row) => row.key.service, {
      header: "Service",
      enableSorting: false,
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor((row) => row, {
      header: "Critical issues",
      id: "issues",
      cell: (info) => {
        const value = info.getValue().issues;
        return (
          <IssuesLink
            onClick={() =>
              handleSeeIssuesLinkClick(info.getValue().key.service, "issues")
            }
          >
            {!showSign ? value : `${value > 0 ? "+" : ""}${value}`}
          </IssuesLink>
        );
      },
      sortingFn: sortIssuesFn,
      meta: {
        contentAlign: "center"
      },
      enableSorting: true
    }),
    columnHelper.accessor((row) => row, {
      id: "impact",
      header: "Impact",
      cell: (info) => (
        <IssuesLink
          onClick={() =>
            handleSeeIssuesLinkClick(info.getValue().key.service, "impact")
          }
        >
          {Math.round(info.getValue().impact * 100)}
        </IssuesLink>
      ),
      sortingFn: sortImpactFn,
      enableSorting: true,
      meta: {
        contentAlign: "center"
      }
    }),
    columnHelper.accessor(
      (row) => getSeverity(minImpact, maxImpact, row.impact),
      {
        header: "Rank",
        id: "rank",
        enableSorting: true,
        cell: (info) => {
          return info.getValue();
        },
        sortingFn: sortingFns.alphanumeric,
        meta: {
          contentAlign: "center"
        }
      }
    )
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
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
                  <s.TableHeaderCellContent
                    onClick={header.column.getToggleSortingHandler()}
                    $align={meta?.contentAlign}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {isUndefined(header.column.columnDef.enableSorting) ||
                      (header.column.columnDef.enableSorting &&
                        {
                          asc: (
                            <s.SortingOrderIconContainer
                              $sortingOrder={SORTING_ORDER.ASC}
                            >
                              <SortIcon color={"currentColor"} size={16} />
                            </s.SortingOrderIconContainer>
                          ),
                          desc: (
                            <s.SortingOrderIconContainer
                              $sortingOrder={SORTING_ORDER.DESC}
                            >
                              <SortIcon color={"currentColor"} size={16} />
                            </s.SortingOrderIconContainer>
                          )
                        }[(header.column.getIsSorted() as string) || "asc"])}
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
