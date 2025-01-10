import type { SortingFn } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import type { ReactNode } from "react";
import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../../Dashboard/MetricsReport/tracking";
import { SortIcon } from "../../icons/16px/SortIcon";
import { ChevronIcon } from "../../icons/20px/ChevronIcon";
import { Direction } from "../../icons/types";
import { Tooltip } from "../../v3/Tooltip";
import type { PresentationalReportData } from "../types";
import * as s from "./styles";
import type { ColumnMeta, Severity, TableProps } from "./types";

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

export const Table = ({
  data,
  timeMode,
  onTitleClick,
  onIssuesStatsClick,
  scoreCriterion,
  viewLevel
}: TableProps) => {
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
      header: "Issues",
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
                <th
                  key={header.id}
                  style={{
                    width: meta?.width,
                    minWidth: meta?.minWidth
                  }}
                >
                  <s.TableHeaderCellContent
                    $align={meta?.contentAlign}
                    onClick={
                      header.column.columnDef.enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <Tooltip
                      title={
                        <s.TableHeaderTooltipTitle>
                          {header.column.columnDef.header?.toString()}
                        </s.TableHeaderTooltipTitle>
                      }
                    >
                      <s.TableHeaderTitle>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </s.TableHeaderTitle>
                    </Tooltip>
                    {header.column.columnDef.enableSorting &&
                      {
                        asc: (
                          <s.SortingOrderIconContainer>
                            <SortIcon
                              color={"currentColor"}
                              size={16}
                              direction={Direction.UP}
                            />
                          </s.SortingOrderIconContainer>
                        ),
                        desc: (
                          <s.SortingOrderIconContainer>
                            <SortIcon
                              color={"currentColor"}
                              size={16}
                              direction={Direction.DOWN}
                            />
                          </s.SortingOrderIconContainer>
                        )
                      }[header.column.getIsSorted() as string]}
                  </s.TableHeaderCellContent>
                </th>
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
