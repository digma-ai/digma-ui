import { useEffect } from "react";
import { Location, useLocation, useNavigationType } from "react-router-dom";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { useHistoryNavigation } from "../../Main/useHistoryNavigation";
import { ChevronIcon } from "../../common/icons/20px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

export const HistoryNavigationPanel = () => {
  const { goBack, goForward, canGoBack, canGoForward } = useHistoryNavigation();
  const navigationType = useNavigationType();
  const location = useLocation() as Location<{
    idx: number;
    environmentId?: string;
    spanCodeObjectId?: string;
  } | null>;

  useEffect(() => {
    // react-router-dom doesn't export Action enum
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (navigationType === "POP") {
      const spanCodeObjectId = location.state?.spanCodeObjectId;
      changeScope({
        span: spanCodeObjectId
          ? {
              spanCodeObjectId
            }
          : null,
        environmentId: location.state?.environmentId,
        context: {
          event: SCOPE_CHANGE_EVENTS.HISTORY
        }
      });
    }
  }, [location.state, navigationType]);

  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    goBack();
  };

  const handleForwardButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FORWARD_BUTTON_CLICKED);
    goForward();
  };

  return (
    <s.Container>
      <s.Button onClick={handleBackButtonClick} disabled={!canGoBack}>
        <ChevronIcon
          direction={Direction.LEFT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
      <s.Button onClick={handleForwardButtonClick} disabled={!canGoForward}>
        <ChevronIcon
          direction={Direction.RIGHT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
    </s.Container>
  );
};
