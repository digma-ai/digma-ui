import { useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { CircleLoaderProps } from "../common/CircleLoader/types";
import { IconButton } from "../common/IconButton";
import { CrossIcon } from "../common/icons/CrossIcon";
import { NotificationCard } from "./NotificationCard";
import * as s from "./styles";
import { NotificationsData, NotificationsProps } from "./types";

const REFRESH_INTERVAL = isNumber(window.notificationsRefreshInterval)
  ? window.notificationsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "NOTIFICATIONS";

export const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  CLOSE: "CLOSE",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_NOTIFICATIONS: "GO_TO_NOTIFICATIONS"
});

const getCircleLoaderColors = (
  theme: DefaultTheme
): CircleLoaderProps["colors"] => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#fff"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#2b2d30"
      };
  }
};

export const Notifications = (props: NotificationsProps) => {
  const [data, setData] = useState<NotificationsData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  // const [isInitialLoading, setIsInitialLoading] = useState(false);
  const theme = useTheme();
  const circleLoaderColors = getCircleLoaderColors(theme);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA
    });
    // setIsInitialLoading(true);

    const handleInsightsData = (data: unknown, timeStamp: number) => {
      setData(data as NotificationsData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleInsightsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleInsightsData);
    };
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      window.sendMessageToDigma({
        action: actions.GET_DATA
      });
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp]);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [props.data]);

  // useEffect(() => {
  //   if (!previousData && data) {
  //     setIsInitialLoading(false);
  //   }
  // }, [previousData, data]);

  const handleCloseButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.CLOSE
    });
  };

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN,
      payload: {
        spanCodeObjectId
      }
    });
  };

  return (
    <s.Container>
      <IconButton onClick={handleCloseButtonClick} icon={CrossIcon} />
      {data &&
        data.notifications.map((x) => (
          <NotificationCard
            key={x.notificationId}
            data={x}
            onSpanLinkClick={handleSpanLinkClick}
          />
        ))}
    </s.Container>
  );
};
