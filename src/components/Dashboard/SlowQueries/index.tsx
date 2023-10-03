import { useEffect, useRef, useState } from "react";
import { PERCENTILES } from "../../../constants";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { Pagination } from "../../common/Pagination";
import { Toggle } from "../../common/Toggle";
import { ToggleValue } from "../../common/Toggle/types";
import { SnailIcon } from "../../common/icons/SnailIcon";
import { actions } from "../actions";
import * as s from "./styles";
import { SlowQueriesData, SlowQueriesProps } from "./types";

const DASHBOARD_TYPE = "SlowQuery";
const DEFAULT_PERCENTILE = 0.5;
const PAGE_SIZE = 4;
const REFRESH_INTERVAL = isNumber(window.dashboardRefreshInterval)
  ? window.dashboardRefreshInterval
  : 10 * 1000; // in milliseconds

const getPercentileKey = (percentileValue: number): "p50" | "p95" | null => {
  switch (percentileValue) {
    case 0.5:
      return "p50";
    case 0.95:
      return "p95";
    default:
      return null;
  }
};

export const SlowQueries = (props: SlowQueriesProps) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const [data, setData] = useState<SlowQueriesData>();
  const previousData = usePrevious(data);
  const entries = data ? data.data.entries : [];
  const totalCount = data?.data.totalCount || 0;
  const percentile = getPercentileKey(percentileViewMode);
  const previousPercentile = usePrevious(percentile);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA,
      payload: {
        type: DASHBOARD_TYPE,
        environment: props.environment,
        percentile: getPercentileKey(DEFAULT_PERCENTILE),
        query: {
          page: 0,
          pageSize: PAGE_SIZE
        }
      }
    });
    setIsInitialLoading(true);

    const handleSetData = (data: unknown, timeStamp: number) => {
      setData(data as SlowQueriesData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleSetData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleSetData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, [props.environment]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_DATA,
          payload: {
            type: DASHBOARD_TYPE,
            environment: props.environment,
            percentile,
            query: {
              page,
              pageSize: PAGE_SIZE
            }
          }
        });
      }, REFRESH_INTERVAL);
    }
  }, [
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    page,
    percentile,
    props.environment
  ]);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (isString(previousPercentile) && previousPercentile !== percentile)
    ) {
      window.sendMessageToDigma({
        action: actions.GET_DATA,
        payload: {
          type: DASHBOARD_TYPE,
          environment: props.environment,
          percentile,
          query: {
            page,
            pageSize: PAGE_SIZE
          }
        }
      });
    }
  }, [previousPage, page, previousPercentile, percentile, props.environment]);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const handlePercentileToggleValueChange = (value: ToggleValue) => {
    if (value !== percentileViewMode) {
      setPercentileViewMode(value as number);
    }
  };

  const handleSpanClick = (spanCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN,
      payload: {
        spanCodeObjectId
      }
    });
  };

  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );

  return (
    <s.Container>
      <s.Header>
        <s.Title>
          <div>
            <SnailIcon size={16} color={"currentColor"} />
          </div>
          Slow Queries
        </s.Title>
        <Toggle
          options={PERCENTILES.map((percentile) => ({
            value: percentile.percentile,
            label: percentile.label
          }))}
          value={percentileViewMode}
          onValueChange={handlePercentileToggleValueChange}
        />
      </s.Header>
      {isInitialLoading ? (
        <s.CircleLoaderContainer>
          <NewCircleLoader size={24} />
        </s.CircleLoaderContainer>
      ) : (
        <>
          <s.ContentContainer>
            <div>
              {entries.map((x) => {
                const durationKey = getPercentileKey(percentileViewMode);
                const duration = durationKey ? x[durationKey] : undefined;
                const durationString = duration
                  ? `${duration.value} ${duration.unit}`
                  : "";

                return (
                  <s.Entry key={x.spanCodeObjectId}>
                    <s.SpanLink
                      onClick={() => handleSpanClick(x.spanCodeObjectId)}
                    >
                      {x.displayName}
                    </s.SpanLink>
                    <s.Duration>{durationString}</s.Duration>
                  </s.Entry>
                );
              })}
            </div>
          </s.ContentContainer>
          <s.Footer>
            <s.ItemsCount>
              Showing{" "}
              <s.PageItemsCount>
                {pageStartItemNumber} - {pageEndItemNumber}
              </s.PageItemsCount>{" "}
              of {totalCount}
            </s.ItemsCount>
            <Pagination
              itemsCount={totalCount}
              onPageChange={setPage}
              page={page}
              pageSize={PAGE_SIZE}
              extendedNavigation={true}
            />
          </s.Footer>
        </>
      )}
    </s.Container>
  );
};
