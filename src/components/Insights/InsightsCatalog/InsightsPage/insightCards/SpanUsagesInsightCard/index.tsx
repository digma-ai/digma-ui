import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { usePrevious } from "../../../../../../hooks/usePrevious";
import { useConfigSelector } from "../../../../../../store/config/useConfigSelector";
import { isNumber } from "../../../../../../typeGuards/isNumber";
import { InsightType } from "../../../../../../types";
import { roundTo } from "../../../../../../utils/roundTo";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { ArrowToTopIcon } from "../../../../../common/icons/20px/ArrowToTopIcon";
import { ArrowDashedLineIcon } from "../../../../../common/icons/ArrowDashedLineIcon";
import { Direction } from "../../../../../common/icons/types";
import { Button } from "../../../../../common/v3/Button";
import { NewButton } from "../../../../../common/v3/NewButton";
import { Pagination } from "../../../../../common/v3/Pagination";
import { Tag } from "../../../../../common/v3/Tag";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { SpanUsagesInsight, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import * as s from "./styles";
import { ColumnMeta, SpanUsagesInsightCardProps } from "./types";

const PAGE_SIZE = 3;

const FlowArrow = (
  <s.ArrowIconContainer>
    <ArrowDashedLineIcon direction={Direction.RIGHT} color={"currentColor"} />
  </s.ArrowIconContainer>
);

export const SpanUsagesInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode
}: SpanUsagesInsightCardProps) => {
  const { isJaegerEnabled } = useConfigSelector();
  const [data, setData] = useState({
    pageItems: insight.flows.slice(0, PAGE_SIZE)
  });
  const [pageItems, page, setPage] = usePagination(
    insight.flows,
    PAGE_SIZE,
    insight.id
  );
  const previousPage = usePrevious(page);
  const previousInsightId = usePrevious(insight.id);

  // Keep pageItems in state to avoid table infinite re-rendering
  // More info: https://github.com/TanStack/table/issues/4614
  useEffect(() => {
    if (
      Boolean(previousInsightId && previousInsightId !== insight.id) ||
      (isNumber(previousPage) && previousPage !== page)
    ) {
      setData({ pageItems });
    }
  }, [previousInsightId, insight, previousPage, page, pageItems]);

  const handleServiceLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleEmptyStateTraceButtonClick = () => {
    if (!insight.sampleTrace) {
      return;
    }

    onTraceButtonClick(
      {
        id: insight.sampleTrace,
        name: insight.spanInfo?.displayName
      },
      insight.type,
      insight.spanInfo?.spanCodeObjectId
    );
  };

  const columnHelper = createColumnHelper<SpanUsagesInsight["flows"][0]>();

  const columns = [
    columnHelper.accessor("percentage", {
      header: "Usage",
      meta: {
        width: "20%",
        minWidth: 60
      },
      cell: (info) => {
        const percentage = info.getValue();
        const percentageString = `${roundTo(percentage, 2)}%`;
        return (
          <Tag
            type={"highlight"}
            content={percentageString}
            title={percentageString}
          />
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "Flow",
      meta: {
        width: "80%",
        minWidth: 30
      },
      cell: (info) => {
        const flow = info.getValue();
        const firstServiceSpanName = `${flow.firstService.service} ${flow.firstService.span}`;
        const lastServiceSpanName = flow.lastService
          ? `${flow.lastService.service} ${flow.lastService.span}`
          : "";
        return (
          <s.FlowData>
            <s.Span>
              <Tooltip title={firstServiceSpanName}>
                <s.FullSpanName>
                  <s.SpanNamePart>{flow.firstService.service}</s.SpanNamePart>
                  <s.Link
                    onClick={() =>
                      handleServiceLinkClick(flow.firstService.spanCodeObjectId)
                    }
                  >
                    {flow.firstService.span}
                  </s.Link>
                </s.FullSpanName>
              </Tooltip>
              <s.StyledCopyButton text={firstServiceSpanName} />
            </s.Span>
            {flow.intermediateSpan && (
              <s.Span>
                {FlowArrow}
                <Tooltip title={flow.intermediateSpan}>
                  <s.FullSpanName>
                    <s.SpanNamePart>{flow.intermediateSpan}</s.SpanNamePart>
                  </s.FullSpanName>
                </Tooltip>
                <s.StyledCopyButton text={flow.intermediateSpan} />
              </s.Span>
            )}
            {flow.lastService && (
              <s.Span>
                {FlowArrow}
                <Tooltip title={lastServiceSpanName}>
                  <s.FullSpanName>
                    <s.SpanNamePart>{flow.lastService.service}</s.SpanNamePart>
                    <s.Link
                      onClick={() =>
                        handleServiceLinkClick(
                          flow.lastService?.spanCodeObjectId
                        )
                      }
                    >
                      {flow.lastService.span}
                    </s.Link>
                  </s.FullSpanName>
                </Tooltip>
                <s.StyledCopyButton text={lastServiceSpanName} />
              </s.Span>
            )}
            {flow.lastServiceSpan && (
              <s.Span>
                {FlowArrow}
                <Tooltip title={flow.lastServiceSpan}>
                  <s.FullSpanName>
                    <s.SpanNamePart>{flow.lastServiceSpan}</s.SpanNamePart>
                  </s.FullSpanName>
                </Tooltip>
                <s.StyledCopyButton text={flow.lastServiceSpan} />
              </s.Span>
            )}
          </s.FlowData>
        );
      }
    }),
    columnHelper.accessor((row) => row, {
      header: "Action",
      meta: {
        width: "10%",
        minWidth: 34
      },
      cell: (info) => {
        const flow = info.getValue();
        const name = `${flow.firstService.service}:${flow.firstService.span}`;
        const traceId = flow.sampleTraceIds[0];

        return (
          <>
            {isJaegerEnabled && traceId && (
              <Tooltip title={"Open Trace"}>
                <Button
                  buttonType={"primary"}
                  icon={TraceIcon}
                  onClick={() =>
                    handleTraceButtonClick(
                      {
                        name,
                        id: traceId
                      },
                      insight.type,
                      insight.spanInfo?.spanCodeObjectId
                    )
                  }
                />
              </Tooltip>
            )}
          </>
        );
      }
    })
  ];

  const table = useReactTable({
    data: data.pageItems,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const renderTable = () => (
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

  const renderEmptyState = () => (
    <s.EmptyStateContainer>
      <s.EmptyStateIconContainer>
        <ArrowToTopIcon size={38} color={"currentColor"} />
      </s.EmptyStateIconContainer>
      <s.EmptyStateTextContainer>
        <s.EmptyStateTitle>This is a top level asset</s.EmptyStateTitle>
        Drill into a specific asset to see more usage information
      </s.EmptyStateTextContainer>
      {insight.sampleTrace && (
        <NewButton
          icon={TraceIcon}
          label={"Trace"}
          onClick={handleEmptyStateTraceButtonClick}
        />
      )}
    </s.EmptyStateContainer>
  );

  return (
    <InsightCard
      insight={insight}
      content={
        insight.flows.length > 0 ? (
          <s.Container>
            {renderTable()}
            <Pagination
              itemsCount={insight.flows.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              withDescription={true}
            />
          </s.Container>
        ) : (
          renderEmptyState()
        )
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
    />
  );
};
