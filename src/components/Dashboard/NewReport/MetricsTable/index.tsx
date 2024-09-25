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
import { ChevronIcon } from "../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
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

const NavigationLink = ({
  text,
  withChevron
}: {
  text: string;
  withChevron?: boolean;
}) => {
  return (
    <s.NavigationLinkContainer $withChevron={withChevron}>
      {text}
      {withChevron && (
        <ChevronIcon
          direction={Direction.RIGHT}
          color={"currentColor"}
          size={20}
        />
      )}
    </s.NavigationLinkContainer>
  );
};

const HoverableTableCellContent = ({
  children,
  onClick,
  hoverContent
}: {
  onClick: () => void;
  children: ReactNode;
  hoverContent: ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <s.HoverableContentContainer
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? hoverContent : children}
    </s.HoverableContentContainer>
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

  const handleIssuesLinkClick = (value: string, source: string) => {
    onIssuesStatsClick(value);
    sendUserActionTrackingEvent(trackingEvents.TABLE_SEE_ISSUES_LINK_CLICKED, {
      source
    });
  };

  const handleTitleLinkClick = (value: string) => {
    onTitleClick(value);
    sendUserActionTrackingEvent(trackingEvents.TABLE_ITEM_NAME_CLICKED, {
      view: viewLevel
    });
  };

  const columns = [
    columnHelper.accessor((row) => row, {
      header: viewLevel === "services" ? "Service" : "Endpoints",
      cell: (info) => {
        const value = info.getValue();
        return (
          <HoverableTableCellContent
            onClick={() => handleTitleLinkClick(value.id)}
            hoverContent={
              <NavigationLink
                text={`See ${
                  viewLevel === "services" ? "endpoints" : "issues"
                }`}
                withChevron={true}
              />
            }
          >
            {value.name}
          </HoverableTableCellContent>
        );
      },
      meta: {
        width: "40%",
        minWidth: 270
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
            onClick={() => handleIssuesLinkClick(value.id, "issues")}
            hoverContent={<NavigationLink text={"See issues"} />}
          >
            {timeMode === "baseline"
              ? issuesCount
              : `${issuesCount > 0 ? "+" : ""}${issuesCount}`}
          </HoverableTableCellContent>
        );
      },
      sortingFn: sortIssuesFn,
      meta: {
        contentAlign: "center",
        meta: {
          width: "20%",
          minWidth: 140
        }
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
            onClick={() => handleIssuesLinkClick(value.id, scoreCriterion)}
            hoverContent={<NavigationLink text={"See issues"} />}
          >
            {value.score}
          </HoverableTableCellContent>
        );
      },
      sortingFn: sortScoreFn,
      enableSorting: true,
      meta: {
        contentAlign: "center",
        meta: {
          width: "20%",
          minWidth: 140
        }
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
        contentAlign: "center",
        meta: {
          width: "20%",
          minWidth: 100
        }
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
                    style={{
                      width: meta?.width,
                      minWidth: meta?.minWidth
                    }}
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
