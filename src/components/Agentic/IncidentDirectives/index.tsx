import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  useDeleteIncidentAgentDirectiveMutation,
  useGetIncidentAgentDirectivesQuery
} from "../../../redux/services/digma";
import { CancelConfirmation } from "../../common/CancelConfirmation";
import { SortIcon } from "../../common/icons/16px/SortIcon";
import { TrashBinIcon } from "../../common/icons/16px/TrashBinIcon";
import { Direction } from "../../common/icons/types";
import { KebabMenu } from "../../common/KebabMenu";
import { Checkmark } from "../../common/v3/Checkmark";
import type { MenuItem } from "../../Navigation/common/MenuList/types";
import * as s from "./styles";
import type { ColumnMeta, ExtendedDirective } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const columnHelper = createColumnHelper<ExtendedDirective>();

export const IncidentDirectives = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [directiveToDelete, setDirectiveToDelete] = useState<string>();

  const { data } = useGetIncidentAgentDirectivesQuery(
    {
      search_term: searchInputValue || undefined
    },
    {
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const [deleteIncidentAgentDirective] =
    useDeleteIncidentAgentDirectiveMutation();

  const handleSearchInputChange = (value: string) => {
    setSearchInputValue(value);
  };

  const handleCheckboxChange = (id: string) => (value: boolean) => {
    setSelectedConditions((prev) =>
      value ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleDeleteDirectiveDialogConfirm = () => {
    if (directiveToDelete) {
      void deleteIncidentAgentDirective({
        id: directiveToDelete
      });
    }
    setDirectiveToDelete(undefined);
  };

  const handleDeleteDirectiveDialogClose = () => {
    setDirectiveToDelete(undefined);
  };

  const handleMessageSend = () => {
    // TODO: implement
  };

  const handleSelectedConditionTagClick = (id: string) => () => {
    setSelectedConditions((prev) => prev.filter((x) => x !== id));
  };

  const items = useMemo(
    () =>
      data?.directives?.map((item, index) => ({
        ...item,
        number: index + 1,
        isSelected: selectedConditions.includes(item.id)
      })) ?? [],
    [selectedConditions, data]
  );

  const columns = [
    columnHelper.accessor((x) => x, {
      id: "selector",
      header: "",
      meta: {
        width: "5%",
        minWidth: 60,
        textAlign: "center"
      },
      cell: (info) => {
        const value = info.getValue();

        return (
          <Checkmark
            value={value.isSelected}
            onChange={handleCheckboxChange(value.id)}
            size={"large"}
          />
        );
      }
    }),
    columnHelper.accessor("number", {
      header: "#",
      meta: {
        width: "5%",
        minWidth: 60,
        textAlign: "center"
      },
      cell: (info) => {
        const value = info.getValue();
        return <s.RecordNumber>{value}</s.RecordNumber>;
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        return rowA.original.number - rowB.original.number;
      }
    }),
    columnHelper.accessor("condition", {
      header: "Condition",
      meta: {
        width: "35%",
        minWidth: 100
      },
      cell: (info) => {
        const value = info.getValue();
        return <s.Condition>{value}</s.Condition>;
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.condition.toLowerCase();
        const b = rowB.original.condition.toLowerCase();
        return a.localeCompare(b);
      }
    }),
    columnHelper.accessor("directive", {
      header: "Directive",
      meta: {
        width: "35%",
        minWidth: 100
      },
      cell: (info) => {
        const value = info.getValue();
        return <s.Directive>{value}</s.Directive>;
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.directive.toLowerCase();
        const b = rowB.original.directive.toLowerCase();
        return a.localeCompare(b);
      }
    }),
    columnHelper.accessor("agents", {
      header: "Agents",
      meta: {
        width: "15%",
        minWidth: 60
      },
      cell: (info) => {
        const value = info.getValue();
        return <span>{value.join(", ")}</span>;
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.agents.join(", ").toLowerCase();
        const b = rowB.original.agents.join(", ").toLowerCase();
        return a.localeCompare(b);
      }
    }),
    columnHelper.accessor((x) => x, {
      header: "Actions",
      meta: {
        width: "5%",
        minWidth: 100,
        textAlign: "center"
      },
      cell: (info) => {
        const value = info.getValue();

        const handleDeleteMenuItemClick = () => {
          setDirectiveToDelete(value.id);
        };

        const items: MenuItem[] = [
          {
            id: "delete",
            icon: <TrashBinIcon />,
            label: "Delete",
            onClick: handleDeleteMenuItemClick
          }
        ];

        return <KebabMenu items={items} />;
      }
    })
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false
  });

  return (
    <s.Container>
      <s.Header>
        Directives
        <s.StyledSearchInput
          onChange={handleSearchInputChange}
          value={searchInputValue}
        />
      </s.Header>
      <s.TableContainer>
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
                        minWidth: meta.minWidth
                      }}
                    >
                      <s.TableHeaderCellContent
                        onClick={
                          header.column.columnDef.enableSorting
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        $align={meta.textAlign}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.columnDef.enableSorting &&
                          {
                            asc: (
                              <s.SortingOrderIconContainer>
                                <SortIcon
                                  color={"currentColor"}
                                  size={16}
                                  direction={Direction.Up}
                                />
                              </s.SortingOrderIconContainer>
                            ),
                            desc: (
                              <s.SortingOrderIconContainer>
                                <SortIcon
                                  color={"currentColor"}
                                  size={16}
                                  direction={Direction.Down}
                                />
                              </s.SortingOrderIconContainer>
                            )
                          }[header.column.getIsSorted() as string]}
                      </s.TableHeaderCellContent>
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
                        minWidth: meta.minWidth,
                        justifyContent: meta.textAlign
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </s.TableBodyCell>
                  );
                })}
              </s.TableBodyRow>
            ))}
          </s.TableBody>
        </s.Table>
      </s.TableContainer>
      <s.StyledAgentChat
        data={[]}
        isDataLoading={false}
        onMessageSend={handleMessageSend}
        isMessageSending={false}
        attachmentsComponent={
          selectedConditions.length > 0 && (
            <s.SelectedConditionsContainer>
              {selectedConditions.map((x) => (
                <s.SelectedConditionTag
                  onClick={handleSelectedConditionTagClick(x)}
                  key={x}
                >
                  #{x}
                </s.SelectedConditionTag>
              ))}
            </s.SelectedConditionsContainer>
          )
        }
      />
      {directiveToDelete && (
        <s.StyledOverlay>
          <CancelConfirmation
            header={"Delete directive"}
            description={"Are you sure you want to delete this directive?"}
            onClose={handleDeleteDirectiveDialogClose}
            onConfirm={handleDeleteDirectiveDialogConfirm}
            confirmBtnText={"Yes, delete"}
            cancelBtnText={"No, keep it"}
          />
        </s.StyledOverlay>
      )}
    </s.Container>
  );
};
