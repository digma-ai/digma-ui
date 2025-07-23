import { useEffect, useRef, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isBoolean } from "../../typeGuards/isBoolean";
import { isNumber } from "../../typeGuards/isNumber";
import { ScopeChangeEvent } from "../../types";
import { changeScope } from "../../utils/actions/changeScope";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { FullView } from "./FullView";
import { RecentView } from "./RecentView";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { isNotificationsViewMode } from "./typeGuards";
import type {
  CodeObjectData,
  NotificationsData,
  NotificationsError,
  NotificationsProps,
  NotificationsSetDataPayload
} from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const Notifications = ({ viewMode }: NotificationsProps) => {
  const [data, setData] = useState<NotificationsSetDataPayload>();
  const previousData = usePrevious(data);
  const [notificationsData, setNotificationsData] =
    useState<NotificationsData>();
  const [notificationError, setNotificationsError] =
    useState<NotificationsError>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const previousShowAll = usePrevious(showAll);
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const refreshTimerId = useRef<number>();
  const notificationsViewMode = isNotificationsViewMode(
    window.notificationsViewMode
  )
    ? window.notificationsViewMode
    : (viewMode ?? "full");
  const pageSize = notificationsViewMode === "popup" ? 3 : 10;

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED);

    window.sendMessageToDigma({
      action: actions.GET_DATA,
      payload: {
        pageNumber: page + 1,
        pageSize,
        isRead: showAll
      }
    });
    setIsInitialLoading(true);

    const handleSetData = (data: unknown, timeStamp: number) => {
      setData(data as NotificationsSetDataPayload);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleSetData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleSetData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (previousData !== data && data) {
      setNotificationsData(data.data ?? undefined);

      if (!notificationsData) {
        setNotificationsError(data.error ?? undefined);
      } else {
        setNotificationsError(undefined);
      }
    }
  }, [previousData, data, notificationsData]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_DATA,
          payload: {
            pageNumber: page + 1,
            pageSize,
            isRead: showAll
          }
        });
      }, REFRESH_INTERVAL);
    }
  }, [
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    page,
    showAll,
    pageSize
  ]);

  useEffect(() => {
    if (isBoolean(previousShowAll) && previousShowAll !== showAll) {
      setPage(0);
    }
  }, [previousShowAll, showAll]);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (isBoolean(previousShowAll) && previousShowAll !== showAll)
    ) {
      window.sendMessageToDigma({
        action: actions.GET_DATA,
        payload: {
          pageNumber: page + 1,
          pageSize,
          isRead: showAll
        }
      });
    }
  }, [previousShowAll, showAll, previousPage, page, pageSize]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const handleClose = () => {
    window.sendMessageToDigma({
      action: actions.CLOSE
    });
  };

  const handleGoToNotifications = () => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_ALL_LINK_CLICKED);
    window.sendMessageToDigma({
      action: actions.GO_TO_NOTIFICATIONS
    });
  };

  const handleFilterChange = (showAll: boolean) => {
    setShowAll(showAll);
  };

  const handleLinkClick = (codeObjectData: CodeObjectData) => {
    sendUserActionTrackingEvent(trackingEvents.LINK_CLICKED);

    if (codeObjectData.spanCodeObjectId) {
      changeScope({
        span: {
          spanCodeObjectId: codeObjectData.spanCodeObjectId
        },
        context: {
          event: ScopeChangeEvent.NotificationsNotificationCardAssetLinkClicked
        }
      });
    }
  };

  return (
    <s.Container>
      {notificationsViewMode === "popup" ? (
        <RecentView
          data={notificationsData}
          error={notificationError}
          onLinkClick={handleLinkClick}
          onGoToNotifications={handleGoToNotifications}
          onClose={handleClose}
          isLoading={isInitialLoading}
        />
      ) : (
        <FullView
          data={notificationsData}
          error={notificationError}
          onLinkClick={handleLinkClick}
          onPageChange={setPage}
          onFilterChange={handleFilterChange}
          showAll={showAll}
          onClose={handleClose}
          page={page}
          pageSize={pageSize}
          isLoading={isInitialLoading}
        />
      )}
    </s.Container>
  );
};
