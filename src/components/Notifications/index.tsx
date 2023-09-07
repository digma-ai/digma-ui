import { useEffect, useRef, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isBoolean } from "../../typeGuards/isBoolean";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { FullView } from "./FullView";
import { RecentView } from "./RecentView";
import * as s from "./styles";
import {
  GoToInsightsPayload,
  NotificationsData,
  NotificationsError,
  NotificationsProps,
  NotificationsSetDataPayload
} from "./types";

const REFRESH_INTERVAL = isNumber(window.notificationsRefreshInterval)
  ? window.notificationsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "NOTIFICATIONS";

const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  CLOSE: "CLOSE",
  GO_TO_INSIGHTS: "GO_TO_INSIGHTS",
  GO_TO_NOTIFICATIONS: "GO_TO_NOTIFICATIONS"
});

const TRACKING_PREFIX = "notifications";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    LINK_CLICKED: "link clicked",
    VIEW_ALL_LINK_CLICKED: "view all link clicked"
  },
  " "
);

// const getCircleLoaderColors = (
//   theme: DefaultTheme
// ): CircleLoaderProps["colors"] => {
//   switch (theme.mode) {
//     case "light":
//       return {
//         start: "rgb(81 84 236 / 0%)",
//         end: "#5154ec",
//         background: "#fff"
//       };
//     case "dark":
//     case "dark-jetbrains":
//       return {
//         start: "rgb(120 145 208 / 0%)",
//         end: "#7891d0",
//         background: "#2b2d30"
//       };
//   }
// };

export const Notifications = (props: NotificationsProps) => {
  const [data, setData] = useState<NotificationsSetDataPayload>();
  const previousData = usePrevious(data);
  const [notificationsData, setNotificationsData] =
    useState<NotificationsData>();
  const [notificationError, setNotificationsError] =
    useState<NotificationsError>();
  // const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  // const [isInitialLoading, setIsInitialLoading] = useState(false);
  // const circleLoaderColors = getCircleLoaderColors(theme);
  const [showAll, setShowAll] = useState(false);
  const previousShowAll = usePrevious(showAll);
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const refreshTimerId = useRef<number>();
  const viewMode = window.notificationsViewMode || props.viewMode || "full";
  const pageSize = viewMode === "popup" ? 3 : 10;

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA,
      payload: {
        pageNumber: 1,
        pageSize,
        isRead: false
      }
    });
    // setIsInitialLoading(true);

    const handleSetData = (data: unknown, timeStamp: number) => {
      setData(data as NotificationsSetDataPayload);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleSetData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleSetData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, [pageSize]);

  useEffect(() => {
    if (previousData !== data && data) {
      setNotificationsData(data.data || undefined);

      if (!notificationsData) {
        setNotificationsError(data.error || undefined);
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
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [data, props.data]);

  // useEffect(() => {
  //   if (!previousData && data) {
  //     setIsInitialLoading(false);
  //   }
  // }, [previousData, data]);

  const handleClose = () => {
    window.sendMessageToDigma({
      action: actions.CLOSE
    });
  };

  const handleGoToNotifications = () => {
    sendTrackingEvent(trackingEvents.VIEW_ALL_LINK_CLICKED);
    window.sendMessageToDigma({
      action: actions.GO_TO_NOTIFICATIONS
    });
  };

  const handleFilterChange = (showAll: boolean) => {
    setShowAll(showAll);
  };

  const handleLinkClick = (codeObjectData: GoToInsightsPayload) => {
    sendTrackingEvent(trackingEvents.LINK_CLICKED);
    window.sendMessageToDigma({
      action: actions.GO_TO_INSIGHTS,
      payload: { ...codeObjectData }
    });
  };

  return (
    <s.Container>
      {viewMode === "popup" ? (
        <RecentView
          data={notificationsData}
          error={notificationError}
          onLinkClick={handleLinkClick}
          onGoToNotifications={handleGoToNotifications}
          onClose={handleClose}
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
        />
      )}
    </s.Container>
  );
};
