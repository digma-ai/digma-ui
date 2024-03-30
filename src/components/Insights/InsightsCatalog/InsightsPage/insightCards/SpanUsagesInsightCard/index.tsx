import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { usePrevious } from "../../../../../../hooks/usePrevious";
import { isNumber } from "../../../../../../typeGuards/isNumber";
import { InsightType } from "../../../../../../types";
import { roundTo } from "../../../../../../utils/roundTo";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { ArrowDashedLineIcon } from "../../../../../common/icons/ArrowDashedLineIcon";
import { Direction } from "../../../../../common/icons/types";
import { Button } from "../../../../../common/v3/Button";
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
  isMarkAsReadButtonEnabled
}: SpanUsagesInsightCardProps) => {
  const config = useContext(ConfigContext);
  const [data, setData] = useState({
    pageItems: insight.flows.slice(0, PAGE_SIZE)
  });
  const [pageItems, page, setPage] = usePagination(
    insight.flows,
    PAGE_SIZE,
    insight.codeObjectId
  );
  const previousPage = usePrevious(page);
  const previousCodeObjectId = usePrevious(insight.codeObjectId);

  // Keep pageItems in state to avoid table infinite re-rendering
  // More info: https://github.com/TanStack/table/issues/4614
  useEffect(() => {
    if (
      (previousCodeObjectId && previousCodeObjectId !== insight.codeObjectId) ||
      (isNumber(previousPage) && previousPage !== page)
    ) {
      setData({ pageItems });
    }
  }, [previousCodeObjectId, insight, previousPage, page, pageItems]);

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
        return (
          <Tag type={"highlight"} content={`${roundTo(percentage, 2)}%`} />
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
        return (
          <s.FlowData>
            <Tooltip
              title={`${flow.firstService.service} ${flow.firstService.span}`}
            >
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
            {flow.intermediateSpan && (
              <s.SubsequentSpan>
                {FlowArrow}
                <Tooltip title={flow.intermediateSpan}>
                  <s.FullSpanName>
                    <s.SpanNamePart>{flow.intermediateSpan}</s.SpanNamePart>
                  </s.FullSpanName>
                </Tooltip>
              </s.SubsequentSpan>
            )}
            {flow.lastService && (
              <s.SubsequentSpan>
                {FlowArrow}
                <Tooltip
                  title={`${flow.lastService.service} ${flow.lastService.span}`}
                >
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
              </s.SubsequentSpan>
            )}
            {flow.lastServiceSpan && (
              <s.SubsequentSpan>
                {FlowArrow}
                <Tooltip title={flow.lastServiceSpan}>
                  <s.FullSpanName>
                    <s.SpanNamePart>{flow.lastServiceSpan}</s.SpanNamePart>
                  </s.FullSpanName>
                </Tooltip>
              </s.SubsequentSpan>
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
            {config.isJaegerEnabled && traceId && (
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

  return (
    <InsightCard
      insight={insight}
      content={
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
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
