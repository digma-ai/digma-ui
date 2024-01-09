import { useEffect, useRef, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { EmptyState } from "../common/EmptyState";
import { NewCircleLoader } from "../common/NewCircleLoader";
import * as s from "./styles";
import { SetSpanLatestDataPayload } from "./types";

const PAGE_SIZE = 10;
const REFRESH_INTERVAL = isNumber(window.testsRefreshInterval)
  ? window.testsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "TESTS";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  GET_SPAN_LATEST_DATA: "SPAN_GET_LATEST_DATA",
  SET_SPAN_LATEST_DATA: "SPAN_SET_LATEST_DATA"
});

const TRACKING_PREFIX = "tests";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded"
  },
  " "
);

export const Tests = () => {
  const [data, setData] = useState<SetSpanLatestDataPayload>();
  const previousData = usePrevious(data);
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const refreshTimerId = useRef<number>();
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED);

    window.sendMessageToDigma({
      action: actions.GET_SPAN_LATEST_DATA,
      payload: {
        pageNumber: 0,
        pageSize: PAGE_SIZE
      }
    });
    setIsInitialLoading(true);

    const handleSetSpanLatestData = (data: unknown, timeStamp: number) => {
      setData(data as SetSpanLatestDataPayload);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      actions.SET_SPAN_LATEST_DATA,
      handleSetSpanLatestData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_SPAN_LATEST_DATA,
        handleSetSpanLatestData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_SPAN_LATEST_DATA,
          payload: {
            pageNumber: page + 1,
            pageSize: PAGE_SIZE
          }
        });
      }, REFRESH_INTERVAL);
    }
  }, [previousLastSetDataTimeStamp, lastSetDataTimeStamp, page]);

  useEffect(() => {
    if (isNumber(previousPage) && previousPage !== page) {
      window.sendMessageToDigma({
        action: actions.GET_SPAN_LATEST_DATA,
        payload: {
          pageNumber: page,
          pageSize: PAGE_SIZE
        }
      });
    }
  }, [previousPage, page]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const renderContent = () => {
    if (isInitialLoading) {
      return (
        <s.NoDataContainer>
          <EmptyState content={<NewCircleLoader size={32} />} />
        </s.NoDataContainer>
      );
    }

    return JSON.stringify(data);
  };

  return <s.Container>{renderContent()}</s.Container>;
};
