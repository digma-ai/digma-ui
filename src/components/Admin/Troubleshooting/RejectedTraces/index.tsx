import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { useNow } from "../../../../hooks/useNow";
import { usePageParam } from "../../../../hooks/usePageParam";
import { useGetBlockedTracesQuery } from "../../../../redux/services/digma";
import {
  type BlockedTrace,
  type GetBlockedTracesResponse
} from "../../../../redux/services/types";
import { isString } from "../../../../typeGuards/isString";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { formatTimeDistance } from "../../../../utils/formatTimeDistance";
import { getDurationString } from "../../../../utils/getDurationString";
import { TraceIcon } from "../../../common/icons/16px/TraceIcon";
import { NewButton } from "../../../common/v3/NewButton";
import { Pagination } from "../../../common/v3/Pagination";
import { Tag } from "../../../common/v3/Tag";
import { Tooltip } from "../../../common/v3/Tooltip";
import { Table } from "../../common/Table";
import * as s from "./styles";

const PAGE_SIZE = 10;

const columnHelper = createColumnHelper<BlockedTrace>();

export const RejectedTraces = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const now = useNow();
  const [blockedTraces, setBlockedTraces] =
    useState<GetBlockedTracesResponse>();

  const { page, setPage } = usePageParam({
    data: blockedTraces,
    pageSize: PAGE_SIZE,
    total: blockedTraces?.total ?? 0
  });

  const { data } = useGetBlockedTracesQuery({
    page,
    pageSize: PAGE_SIZE
  });

  const columns = [
    columnHelper.accessor("asset", {
      header: "Asset",
      meta: {
        width: "50%",
        minWidth: 60
      },
      cell: (info) => {
        const asset = info.getValue();
        const assetName = `${asset.service}:${asset.span}`;
        return (
          <s.AssetNameContainer>
            <Tooltip title={assetName}>
              <s.TruncatedText>{assetName}</s.TruncatedText>
            </Tooltip>
            <s.StyledCopyButton text={assetName} />
          </s.AssetNameContainer>
        );
      }
    }),
    columnHelper.accessor("spans", {
      header: "#Spans",
      meta: {
        width: "10%",
        minWidth: 100,
        textAlign: "center"
      },
      cell: (info) => {
        const value = info.getValue();
        return (
          <s.SpanCounterContainer>
            <s.SpanCounter>
              <s.TruncatedText>{value ?? ""}</s.TruncatedText>
            </s.SpanCounter>
          </s.SpanCounterContainer>
        );
      }
    }),
    columnHelper.accessor("lastSpanTimestamp", {
      header: "Executed",
      meta: {
        width: "10%",
        minWidth: 60
      },
      cell: (info) => {
        const value = info.getValue();
        const title = new Date(value).toString();
        const timeDistanceString = formatTimeDistance(value, now, {
          format: "medium",
          withDescriptiveWords: false
        });

        return <Tag title={title} content={`${timeDistanceString} ago`} />;
      }
    }),
    columnHelper.accessor("duration", {
      header: "Duration",
      meta: {
        width: "10%",
        minWidth: 100
      },
      cell: (info) => {
        const value = info.getValue();

        return value ? <Tag content={getDurationString(value)} /> : null;
      }
    }),
    columnHelper.accessor("reason", {
      header: "Reason",
      meta: {
        width: "15%",
        minWidth: 60
      },
      cell: (info) => {
        const value = info.getValue();
        const reasonString = value
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLocaleLowerCase();
        const formattedReasonString = `${reasonString[0].toLocaleUpperCase()}${reasonString.slice(
          1
        )}`;

        return <s.TruncatedText>{formattedReasonString}</s.TruncatedText>;
      }
    }),
    columnHelper.accessor((x) => x, {
      header: "Actions",
      meta: {
        minWidth: 100
      },
      cell: (info) => {
        const value = info.getValue();

        const handleTraceButtonClick = () => {
          if (isString(window.jaegerURL) && window.jaegerURL.length > 0) {
            let url = `${window.jaegerURL}/trace/${value.traceId}`;

            if (value.asset.span) {
              url = url.concat(`?uiFind=${value.asset.span}`);
            }
            openURLInDefaultBrowser(url);
          }
        };

        return (
          <NewButton
            icon={TraceIcon}
            onClick={handleTraceButtonClick}
            label={"Trace"}
          />
        );
      }
    })
  ];

  const pageItems = data?.traces ?? [];

  const table = useReactTable({
    data: pageItems,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (data) {
      setBlockedTraces(data);
    }
  }, [data]);

  return (
    <s.Container ref={containerRef}>
      {data && (
        <>
          <Table<BlockedTrace> table={table} />
          <Pagination
            itemsCount={data.total}
            page={page}
            onPageChange={handlePageChange}
            pageSize={PAGE_SIZE}
            withDescription={true}
            extendedNavigation={true}
          />
        </>
      )}
    </s.Container>
  );
};
