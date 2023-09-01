import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isBoolean } from "../../typeGuards/isBoolean";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { FullView } from "./FullView";
import { RecentView } from "./RecentView";
import * as s from "./styles";
import { NotificationsData, NotificationsProps } from "./types";

const REFRESH_INTERVAL = isNumber(window.notificationsRefreshInterval)
  ? window.notificationsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "NOTIFICATIONS";

const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  CLOSE: "CLOSE",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_NOTIFICATIONS: "GO_TO_NOTIFICATIONS"
});

const TRACKING_PREFIX = "notifications";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    SPAN_LINK_CLICKED: "span link clicked"
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
  const [data, setData] = useState<NotificationsData>();
  // const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  // const [isInitialLoading, setIsInitialLoading] = useState(false);
  // const circleLoaderColors = getCircleLoaderColors(theme);
  const [showAll, setShowAll] = useState(false);
  const previousShowAll = usePrevious(showAll);
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const [latestNotificationTimestamp, setLatestNotificationTimestamp] =
    useState<string>();
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

    const handleNotificationsData = (data: unknown, timeStamp: number) => {
      setData(data as NotificationsData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleNotificationsData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA,
        handleNotificationsData
      );
    };
  }, [pageSize]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      const timerId = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_DATA,
          payload: {
            pageNumber: page + 1,
            pageSize,
            isRead: showAll
          }
        });
      }, REFRESH_INTERVAL);

      return () => {
        window.clearTimeout(timerId);
      };
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
  }, [props.data]);

  useEffect(() => {
    if (data && data.notifications.length) {
      const timestamp = data.notifications[0].timestamp;
      if (
        !latestNotificationTimestamp ||
        (latestNotificationTimestamp &&
          new Date(timestamp).valueOf() >
            new Date(latestNotificationTimestamp).valueOf())
      ) {
        setLatestNotificationTimestamp(timestamp);
      }
    }
  }, [data, latestNotificationTimestamp]);

  // useEffect(() => {
  //   if (!previousData && data) {
  //     setIsInitialLoading(false);
  //   }
  // }, [previousData, data]);

  const handleClose = () => {
    window.sendMessageToDigma({
      action: actions.CLOSE,
      payload: {
        upToDateTime: latestNotificationTimestamp
      }
    });
  };

  const handleGoToNotifications = () => {
    window.sendMessageToDigma({
      action: actions.GO_TO_NOTIFICATIONS
    });
  };

  const handleFilterChange = (showAll: boolean) => {
    setShowAll(showAll);
  };

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    sendTrackingEvent(trackingEvents.SPAN_LINK_CLICKED);
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN,
      payload: {
        spanCodeObjectId
      }
    });
  };

  return (
    <s.Container>
      {viewMode === "popup" ? (
        <RecentView
          data={data}
          onSpanLinkClick={handleSpanLinkClick}
          onGoToNotifications={handleGoToNotifications}
          onClose={handleClose}
        />
      ) : (
        <FullView
          data={data}
          onSpanLinkClick={handleSpanLinkClick}
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
