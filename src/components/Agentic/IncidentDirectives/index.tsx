import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { SortIcon } from "../../common/icons/16px/SortIcon";
import { TrashBinIcon } from "../../common/icons/16px/TrashBinIcon";
import { Direction } from "../../common/icons/types";
import { KebabMenu } from "../../common/KebabMenu";
import { Checkmark } from "../../common/v3/Checkmark";
import type { MenuItem } from "../../Navigation/common/MenuList/types";
import * as s from "./styles";
import type { ColumnMeta, Directive, ExtendedDirective } from "./types";

const mockData: Directive[] = [
  {
    id: "1",
    condition: "All database issues",
    directive: "Also update migration file",
    agents: ["Agent 1", "Agent 2"]
  },
  {
    id: "2",
    condition: "Checkout service",
    directive: "IAC files at /chart in repo",
    agents: ["Agent 3"]
  },
  {
    id: "3",
    condition: "Share Service",
    directive: "Also update migration file",
    agents: ["Agent 4", "Agent 5"]
  },
  {
    id: "4",
    condition: "Metadata Service",
    directive: "IAC files at /chart in repo",
    agents: ["Agent 6"]
  }
];

const columnHelper = createColumnHelper<ExtendedDirective>();

export const IncidentDirectives = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bottomInputValue, setBottomInputValue] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const handleSearchInputChange = (value: string) => {
    setSearchInputValue(value);
  };

  const handleCheckboxChange = (id: string) => (value: boolean) => {
    setSelectedConditions((prev) =>
      value ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleBottomInputChange = () => {
    setBottomInputValue("");
  };

  const handleBottomInputSubmit = () => {
    return undefined;
  };

  const items = useMemo(() => {
    const filteredItems = mockData.filter((item) => {
      const conditionMatch = item.condition
        .toLowerCase()
        .includes(searchInputValue.toLowerCase());
      const directiveMatch = item.directive
        .toLowerCase()
        .includes(searchInputValue.toLowerCase());
      return conditionMatch || directiveMatch;
    });

    return filteredItems.map((item, index) => ({
      ...item,
      number: index + 1,
      isSelected: selectedConditions.includes(item.id)
    }));
  }, [searchInputValue, selectedConditions]);

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
      cell: () => {
        const handleDeleteMenuItemClick = () => {
          // TODO: implement
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
      {selectedConditions.length > 0 && (
        <s.SelectedConditionsContainer>
          Selected Conditions
          <s.SelectedConditionsList>
            {selectedConditions.map((x) => (
              <s.SelectedConditionTag key={x}>#{x}</s.SelectedConditionTag>
            ))}
          </s.SelectedConditionsList>
        </s.SelectedConditionsContainer>
      )}
      <s.StyledPromptInput
        onChange={handleBottomInputChange}
        onSubmit={handleBottomInputSubmit}
        value={bottomInputValue}
        isDisabled={true}
      />
    </s.Container>
  );
};
