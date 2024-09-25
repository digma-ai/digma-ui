import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  useReactTable
} from "@tanstack/react-table";

import { ReactNode, useState } from "react";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { SortIcon } from "../../../common/icons/16px/SortIcon";
import { SORTING_ORDER } from "../../../common/SortingSelector/types";
import { trackingEvents } from "../tracking";
import { PresentationalReportData } from "../types";
import * as s from "./styles";
import { ColumnMeta, MetricsTableProps, Severity } from "./types";

const sortScoreFn: SortingFn<PresentationalReportData> = (rowA, rowB) => {
  const scoreA = rowA.original.score;
  const scoreB = rowB.original.score;

  return scoreA - scoreB;
};

const sortIssuesFn: SortingFn<PresentationalReportData> = (rowA, rowB) => {
  const issuesA = rowA.original.criticalIssuesCount;
  const issuesB = rowB.original.criticalIssuesCount;

  return issuesA - issuesB;
};

const HoverableTableCellContent = ({
  children,
  onClick,
  hoverText
}: {
  onClick: () => void;
  children: ReactNode;
  hoverText: string;
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
        <s.NavigationText>{hoverText}</s.NavigationText>
      ) : (
        <span>{children}</span>
      )}
    </s.IssuesLinkContainer>
  );
};

export const MetricsTable = ({
  data,
  timeMode,
  onTitleClick,
  onIssuesStatsClick,
  scoreCriterion,
  viewLevel
}: MetricsTableProps) => {
  const columnHelper = createColumnHelper<PresentationalReportData>();

  const handleSeeIssuesLinkClick = (service: string, source: string) => {
    onIssuesStatsClick(service);
    sendUserActionTrackingEvent(trackingEvents.TABLE_SEE_ISSUES_LINK_CLICKED, {
      source
    });
  };

  const handleSeeEndpointsLinkClick = (service: string) => {
    onTitleClick(service);
  };

  const columns = [
    columnHelper.accessor("name", {
      header: viewLevel === "services" ? "Service" : "Endpoints",
      cell: (info) => {
        const value = info.getValue();
        return viewLevel === "services" ? (
          <HoverableTableCellContent
            onClick={() => handleSeeEndpointsLinkClick(value)}
            hoverText={"See endpoints"}
          >
            {value}
          </HoverableTableCellContent>
        ) : (
          value
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "Critical issues",
      id: "issues",
      cell: (info) => {
        const value = info.getValue();
        const issuesCount = value.criticalIssuesCount;
        return (
          <HoverableTableCellContent
            onClick={() => handleSeeIssuesLinkClick(value.name, "issues")}
            hoverText={"See issues"}
          >
            {timeMode === "baseline"
              ? issuesCount
              : `${issuesCount > 0 ? "+" : ""}${issuesCount}`}
          </HoverableTableCellContent>
        );
      },
      sortingFn: sortIssuesFn,
      meta: {
        contentAlign: "center"
      },
      enableSorting: true
    }),
    columnHelper.accessor((row) => row, {
      id: "score",
      header: scoreCriterion,
      cell: (info) => {
        const value = info.getValue();
        return (
          <HoverableTableCellContent
            onClick={() => handleSeeIssuesLinkClick(value.name, scoreCriterion)}
            hoverText={"See issues"}
          >
            {value.score}
          </HoverableTableCellContent>
        );
      },
      sortingFn: sortScoreFn,
      enableSorting: true,
      meta: {
        contentAlign: "center"
      }
    }),
    columnHelper.accessor("severity", {
      header: "Rank",
      id: "rank",
      enableSorting: true,
      cell: (info) => {
        return info.getValue();
      },
      sortingFn: sortScoreFn,
      meta: {
        contentAlign: "center"
      }
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false
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
                    $align={meta?.contentAlign}
                    onClick={
                      header.column.columnDef.enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
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
