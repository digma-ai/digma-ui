import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ChevronIcon } from "../../common/icons/20px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

// TODO: add spanCodeObjectId to the query params
// TODO: and change the scope on the spanCodeObjectId change
export const HistoryNavigationPanel = () => {
  const navigate = useNavigate();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const updateHistoryState = () => {
      const length = window.history.length;
      const state = window.history.state as { idx: number } | undefined;

      setCanGoBack(state ? state.idx > 0 : false);
      setCanGoForward(state ? state.idx < length - 1 : false);
    };

    updateHistoryState();
    window.addEventListener("popstate", updateHistoryState);

    return () => {
      window.removeEventListener("popstate", updateHistoryState);
    };
  }, []);

  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    navigate(-1);
  };

  const handleForwardButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FORWARD_BUTTON_CLICKED);
    navigate(1);
  };

  return (
    <s.Container>
      <s.Button onClick={handleBackButtonClick} disabled={canGoBack}>
        <ChevronIcon
          direction={Direction.LEFT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
      <s.Button onClick={handleForwardButtonClick} disabled={canGoForward}>
        <ChevronIcon
          direction={Direction.RIGHT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
    </s.Container>
  );
};
