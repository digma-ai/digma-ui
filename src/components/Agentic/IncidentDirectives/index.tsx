import {
  fetchEventSource,
  type EventSourceMessage
} from "@microsoft/fetch-event-source";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBlocker, useNavigate } from "react-router";
import { useAgenticDispatch } from "../../../containers/Agentic/hooks";
import {
  digmaApi,
  useDeleteIncidentAgentDirectiveMutation,
  useGetIncidentAgentDirectivesChatEventsQuery,
  useGetIncidentAgentDirectivesQuery,
  useSendMessageToIncidentAgentDirectivesChatMutation
} from "../../../redux/services/digma";
import type { IncidentAgentEvent } from "../../../redux/services/types";
import { isString } from "../../../typeGuards/isString";
import { CancelConfirmation } from "../../common/CancelConfirmation";
import { CrossIcon } from "../../common/icons/16px/CrossIcon";
import { SortIcon } from "../../common/icons/16px/SortIcon";
import { TrashBinIcon } from "../../common/icons/16px/TrashBinIcon";
import { Direction } from "../../common/icons/types";
import { KebabMenu } from "../../common/KebabMenu";
import { Checkmark } from "../../common/v3/Checkmark";
import { Spinner } from "../../common/v3/Spinner";
import { Tooltip } from "../../common/v3/Tooltip";
import type { MenuItem } from "../../Navigation/common/MenuList/types";
import * as s from "./styles";
import type { ColumnMeta, ExtendedDirective } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const REFRESH_INTERVAL_DURING_STREAMING = 3 * 1000; // in milliseconds

const columnHelper = createColumnHelper<ExtendedDirective>();

export const IncidentDirectives = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [directiveToDelete, setDirectiveToDelete] = useState<string>();
  const [conversationId, setConversationId] = useState<string>();
  const [isStartMessageSending, setIsStartMessageSending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [fetchedEvents, setFetchedEvents] = useState<IncidentAgentEvent[]>([]);
  const [placeholderEvents, setPlaceholderEvents] = useState<
    IncidentAgentEvent[]
  >([]);
  const [isCurrentConversationEnded, setIsCurrentConversationEnded] =
    useState(false);
  const navigate = useNavigate();

  const dispatch = useAgenticDispatch();

  const [sendMessage, { isLoading: isSubsequentMessageSending }] =
    useSendMessageToIncidentAgentDirectivesChatMutation();

  const isMessageSending = isStartMessageSending || isSubsequentMessageSending;

  const shouldBlockNavigation = Boolean(conversationId) || isMessageSending;

  const blocker = useBlocker(shouldBlockNavigation);

  const { data: directives } = useGetIncidentAgentDirectivesQuery(
    {
      search_term: searchInputValue || undefined
    },
    {
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const { data: events, isLoading: areEventsLoading } =
    useGetIncidentAgentDirectivesChatEventsQuery(
      {
        conversationId: conversationId ?? ""
      },
      {
        skip: !conversationId || isCurrentConversationEnded,
        pollingInterval: isMessageSending
          ? REFRESH_INTERVAL_DURING_STREAMING
          : REFRESH_INTERVAL
      }
    );

  const [deleteIncidentAgentDirective] =
    useDeleteIncidentAgentDirectiveMutation();

  const handleCloseButtonClick = () => {
    void navigate("/agentic/incidents");
  };

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

  const handleMessageSend = (text: string) => {
    // Send first message to start the new conversation
    if (!conversationId || isCurrentConversationEnded) {
      setConversationId(undefined);
      setFetchedEvents([]);
      setPlaceholderEvents([
        {
          id: "__start_message",
          type: "human",
          agent_name: "incident_entry",
          message: text,
          tool_name: null,
          mcp_name: null
        }
      ]);
      // Stop any existing connection
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsStartMessageSending(true);
      void fetchEventSource(
        `${
          isString(window.digmaApiProxyPrefix)
            ? window.digmaApiProxyPrefix
            : "/api/"
        }Agentic/directives/chat`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          signal: abortControllerRef.current.signal,
          body: JSON.stringify({
            text,
            ids: selectedConditions
          }),
          openWhenHidden: true,
          onopen: (response: Response) => {
            if (response.ok) {
              setConversationId(
                response.headers.get("agentic-conversation-id") ?? ""
              );
              // eslint-disable-next-line no-console
              console.log(
                `[${new Date().toISOString()}] Got conversation ID:`,
                response.headers.get("agentic-conversation-id") ?? ""
              );
              setIsStartMessageSending(false);
              return Promise.resolve();
            } else {
              setIsStartMessageSending(false);
              return Promise.reject(
                new Error(`HTTP ${response.status}: ${response.statusText}`)
              );
            }
          },
          onmessage: (message: EventSourceMessage) => {
            // eslint-disable-next-line no-console
            console.log(
              `[${new Date().toISOString()}] Received message:`,
              message
            );
          },
          onerror: (err: unknown) => {
            abortControllerRef.current = null;
            setIsStartMessageSending(false);
            let errorMessage = "Unknown error starting directives chat";
            if (err instanceof Error) {
              errorMessage = err.message;
            }

            // eslint-disable-next-line no-console
            console.error(errorMessage);

            throw new Error(errorMessage); // Rethrow the error to avoid retrying
          },
          onclose: () => {
            abortControllerRef.current = null;
          }
        }
      );
    } else {
      // Send subsequent messages to continue the current conversation
      void sendMessage({
        conversationId,
        data: { text, ids: selectedConditions }
      });
    }
  };

  const handleSelectedConditionTagClick = (id: string) => () => {
    setSelectedConditions((prev) => prev.filter((x) => x !== id));
  };

  const handleNavigationConfirmationDialogConfirm = () => {
    blocker.proceed?.();
  };

  const handleNavigationConfirmationDialogClose = () => {
    blocker.reset?.();
  };

  const items = useMemo(
    () =>
      directives?.directives?.map((item, index) => ({
        ...item,
        number: index + 1,
        isSelected: selectedConditions.includes(item.id)
      })) ?? [],

    [selectedConditions, directives]
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
        return (
          <Tooltip title={value}>
            <s.Condition>{value}</s.Condition>
          </Tooltip>
        );
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
        const valueString = value.join(", ");
        return (
          <Tooltip title={valueString}>
            <s.TruncatedTableCellContent>
              {valueString}
            </s.TruncatedTableCellContent>
          </Tooltip>
        );
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

  useEffect(() => {
    setSelectedConditions((prev) =>
      prev.filter((x) => directives?.directives.find((item) => item.id === x))
    );
  }, [directives]);

  useEffect(() => {
    const isConversationEnded = Boolean(
      conversationId &&
        fetchedEvents?.some(
          (event) =>
            event.type === "agent_end" &&
            event.agent_name === "directives_manager" &&
            event.conversation_id === conversationId
        )
    );

    setIsCurrentConversationEnded(isConversationEnded);

    if (isConversationEnded) {
      dispatch(digmaApi.util.invalidateTags(["IncidentAgentDirective"]));
    }
  }, [conversationId, fetchedEvents, dispatch]);

  useEffect(() => {
    if (events && events.extra.conversationId === conversationId) {
      setFetchedEvents(events.data);
    }
  }, [events, conversationId]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const chatEvents = useMemo(
    () =>
      (conversationId && fetchedEvents.length > 0
        ? fetchedEvents
        : placeholderEvents) ?? [],
    [placeholderEvents, fetchedEvents, conversationId]
  );

  // Filter out internal tool events
  const filteredEvents = useMemo(
    () =>
      chatEvents.filter(
        (event) => !(event.type === "tool" && event.mcp_name === "")
      ) ?? [],
    [chatEvents]
  );

  return (
    <s.Container>
      <s.Header>
        Directives
        <Tooltip title={"Close"}>
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} size={24} />
          </s.CloseButton>
        </Tooltip>
      </s.Header>
      <s.StyledSearchInput
        onChange={handleSearchInputChange}
        value={searchInputValue}
      />
      <s.TableContainer>
        {directives ? (
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
        ) : (
          <s.LoadingContainer>
            <Spinner size={32} />
          </s.LoadingContainer>
        )}
      </s.TableContainer>
      <s.StyledAgentChat
        conversationId={conversationId}
        data={filteredEvents}
        isDataLoading={areEventsLoading}
        onMessageSend={handleMessageSend}
        isMessageSending={isMessageSending}
        typeInitialMessages={true}
        attachmentsComponent={
          selectedConditions.length > 0 && (
            <s.SelectedConditionsContainer>
              {selectedConditions.map((x) => (
                <s.SelectedConditionTag
                  onClick={handleSelectedConditionTagClick(x)}
                  key={x}
                >
                  #{items.find((d) => d.id === x)?.number}
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
      {blocker.state === "blocked" && (
        <s.StyledOverlay>
          <CancelConfirmation
            header={"Leave this page"}
            description={
              "Are you sure you want to leave? You will lose all chat history."
            }
            onClose={handleNavigationConfirmationDialogClose}
            onConfirm={handleNavigationConfirmationDialogConfirm}
            confirmBtnText={"Yes, leave"}
            cancelBtnText={"No, stay"}
          />
        </s.StyledOverlay>
      )}
    </s.Container>
  );
};
