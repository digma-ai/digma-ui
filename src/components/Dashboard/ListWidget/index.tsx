import { useEffect, useRef, useState } from "react";
import { PERCENTILES } from "../../../constants";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { getPercentileKey } from "../../../utils/getPercentileKey";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { Pagination } from "../../common/Pagination";
import { Toggle } from "../../common/Toggle";
import { ToggleValue } from "../../common/Toggle/types";
import { LightBulbSmallCrossedIcon } from "../../common/icons/LightBulbSmallCrossedIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { DashboardCard } from "../DashboardCard";
import { actions } from "../actions";
import * as s from "./styles";
import { GetDataPayload, ListWidgetData, ListWidgetProps } from "./types";

const PAGE_SIZE = 4;
const DEFAULT_PERCENTILE = 0.5;
const REFRESH_INTERVAL = isNumber(window.dashboardRefreshInterval)
  ? window.dashboardRefreshInterval
  : 10 * 1000; // in milliseconds

const getErrorMessage = (message?: string) => {
  if (message?.endsWith("response code 400")) {
    return "Failed to get widget data";
  }

  return isString(message) ? message : undefined;
};

const getData = (payload: GetDataPayload) => {
  const {
    environment,
    type,
    query: { page, pageSize, percentile }
  } = payload;
  window.sendMessageToDigma({
    action: actions.GET_DATA,
    payload: {
      type,
      environment,
      query: {
        page,
        pageSize: isNumber(pageSize) ? pageSize : PAGE_SIZE,
        ...(isString(percentile) ? { percentile } : {})
      }
    }
  });
};

export const ListWidget = <T extends object>(props: ListWidgetProps<T>) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const [data, setData] = useState<ListWidgetData<T>>();
  const previousData = usePrevious(data);
  const entries = data?.data?.entries || [];
  const totalCount = data?.data?.totalCount || 0;
  const errorMessage = getErrorMessage(data?.error?.message);
  const percentile = getPercentileKey(percentileViewMode);
  const previousPercentile = usePrevious(percentile);
  const previousEnvironment = usePrevious(props.environment);
  const previousType = usePrevious(props.type);

  useEffect(() => {
    getData({
      type: props.type,
      environment: props.environment,
      query: {
        page,
        percentile: getPercentileKey(DEFAULT_PERCENTILE)
      }
    });
    setIsInitialLoading(true);

    const handleSetData = (data: unknown, timeStamp: number) => {
      if ((data as ListWidgetData<unknown>).type === props.type) {
        setData(data as ListWidgetData<T>);
        setLastSetDataTimeStamp(timeStamp);
      }
    };

    dispatcher.addActionListener(actions.SET_DATA, handleSetData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleSetData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData({
          type: props.type,
          environment: props.environment,
          query: {
            page,
            percentile
          }
        });
      }, REFRESH_INTERVAL);
    }
  }, [
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    page,
    percentile,
    props.type,
    props.environment
  ]);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (isString(previousPercentile) && previousPercentile !== percentile) ||
      (isString(previousEnvironment) &&
        previousEnvironment !== props.environment) ||
      (isString(previousType) && previousType !== props.type)
    ) {
      getData({
        type: props.type,
        environment: props.environment,
        query: {
          page,
          percentile
        }
      });
    }
  }, [
    previousPage,
    page,
    previousPercentile,
    percentile,
    props.type,
    previousType,
    props.environment,
    previousEnvironment
  ]);

  useEffect(() => {
    setPage(0);
  }, [props.environment]);

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

  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );

  const headerContent = props.showPercentileToggleSwitch ? (
    <Toggle
      options={PERCENTILES.map((percentile) => ({
        value: percentile.percentile,
        label: percentile.label
      }))}
      value={percentileViewMode}
      onValueChange={handlePercentileToggleValueChange}
    />
  ) : undefined;

  return (
    <DashboardCard
      icon={props.icon}
      title={props.title}
      headerContent={headerContent}
      content={
        <s.Container>
          {entries.length === 0 ? (
            <s.EmptyStateContainer>
              {isInitialLoading ? (
                <NewCircleLoader size={24} />
              ) : errorMessage ? (
                <s.ErrorMessage>
                  <s.IconContainer>
                    <WarningCircleLargeIcon color={"currentColor"} size={14} />
                  </s.IconContainer>
                  {errorMessage}
                </s.ErrorMessage>
              ) : (
                <>
                  <s.EmptyStateIconContainer>
                    <LightBulbSmallCrossedIcon
                      color={"currentColor"}
                      size={72}
                    />
                  </s.EmptyStateIconContainer>
                  <span>No data</span>
                </>
              )}
            </s.EmptyStateContainer>
          ) : (
            <>
              <s.ContentContainer>
                <s.EntryList>
                  {entries.map((x) =>
                    props.renderListItem(x, percentileViewMode)
                  )}
                </s.EntryList>
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
      }
    />
  );
};
