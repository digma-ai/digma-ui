import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../containers/Admin/hooks";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePageParam } from "../../../hooks/usePageParam";
import {
  useDeleteEnvironmentMutation,
  useGetAboutQuery,
  useGetEnvironmentsQuery
} from "../../../redux/services/digma";
import type { Environment } from "../../../redux/services/types";
import {
  setEnvironmentToDelete,
  setIsSidebarOpen
} from "../../../redux/slices/environmentsManagerSlice";
import { FeatureFlag } from "../../../types";
import { sortEnvironments } from "../../common/IssuesReport/utils";
import { Pagination } from "../../common/v3/Pagination";
import { ConfirmationDialog } from "../../RecentActivity/ConfirmationDialog";
import { ActionsMenuButton } from "./ActionsMenuButton";
import { CreateEnvironmentSidebarOverlay } from "./CreateEnvironmentSidebarOverlay";
import * as s from "./styles";
import type { ColumnMeta } from "./types";

const PAGE_SIZE = 10;
const columnHelper = createColumnHelper<Environment>();

export const Environments = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: about } = useGetAboutQuery();
  const isCreateEnvironmentSidebarOpen = useAdminSelector(
    (state) => state.environmentsManager.isSidebarOpen
  );

  const dispatch = useAdminDispatch();
  const isEnvironmentLastActiveTimestampEnabled = getFeatureFlagValue(
    about,
    FeatureFlag.IsEnvironmentLastActiveTimestampEnabled
  );
  const [deleteEnvironment] = useDeleteEnvironmentMutation();
  const environmentToDelete = useAdminSelector(
    (state) => state.environmentsManager.environmentToDelete
  );
  const { data: environments } = useGetEnvironmentsQuery();

  const { page, setPage } = usePageParam({
    data: environments,
    pageSize: PAGE_SIZE,
    total: environments?.length ?? 0
  });

  const sortedEnvironments = useMemo(
    () => sortEnvironments(environments ?? []),
    [environments]
  );

  const pageItems = useMemo(() => {
    const startIndex = page * PAGE_SIZE;

    return sortedEnvironments.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedEnvironments, page]);

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      meta: {
        width: isEnvironmentLastActiveTimestampEnabled ? "70%" : "90%",
        minWidth: 60
      },
      cell: (info) => {
        const name = info.getValue();
        return name;
      }
    }),
    ...(isEnvironmentLastActiveTimestampEnabled
      ? [
          columnHelper.accessor("lastActive", {
            header: "Last active",
            meta: {
              width: "20%",
              minWidth: 100
            },
            cell: (info) => {
              const value = info.getValue();
              const dateString = value
                ? format(value, "MMM d, y h:mm aaa")
                : "";

              return (
                <s.LastActiveTimestamp>{dateString}</s.LastActiveTimestamp>
              );
            }
          })
        ]
      : []),
    columnHelper.accessor("type", {
      header: "Type",
      meta: {
        width: "10%",
        minWidth: 100
      },
      cell: (info) => {
        const value = info.getValue();
        return <s.EnvironmentType>{value}</s.EnvironmentType>;
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "Actions",
      meta: {
        width: "10%",
        minWidth: 60,
        textAlign: "right"
      },
      cell: (info) => {
        const value = info.getValue();
        return <ActionsMenuButton environment={value} />;
      }
    })
  ];

  const table = useReactTable({
    data: pageItems,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCreateEnvironmentSidebarClose = () => {
    dispatch(setIsSidebarOpen(false));
  };

  const handleOverlayClick = () => {
    handleCloseDeleteConfirmation();
  };

  const handleConfirmEnvironmentDeletion = () => {
    if (!environmentToDelete) {
      return;
    }

    void deleteEnvironment({
      id: environmentToDelete
    });
    dispatch(setEnvironmentToDelete(null));
  };

  const handleCloseDeleteConfirmation = () => {
    dispatch(setEnvironmentToDelete(null));
  };

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, [page]);

  return (
    <s.Container ref={containerRef}>
      {environments && (
        <>
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
          <Pagination
            itemsCount={sortedEnvironments.length}
            page={page}
            onPageChange={handlePageChange}
            pageSize={PAGE_SIZE}
            withDescription={true}
            extendedNavigation={true}
          />
        </>
      )}
      {environmentToDelete && (
        <s.Overlay onClose={handleOverlayClick} tabIndex={-1}>
          <ConfirmationDialog
            title={"Delete environment"}
            content={"Are you sure that you want to delete this environment?"}
            confirmButtonText={"Delete"}
            onConfirm={handleConfirmEnvironmentDeletion}
            onCancel={handleCloseDeleteConfirmation}
            trackingData={{
              dialog: "Delete environment"
            }}
          />
        </s.Overlay>
      )}
      <CreateEnvironmentSidebarOverlay
        isSidebarOpen={isCreateEnvironmentSidebarOpen}
        onSidebarClose={handleCreateEnvironmentSidebarClose}
      />
    </s.Container>
  );
};
