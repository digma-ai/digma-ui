import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ChevronIcon } from "../../common/icons/20px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { HistoryNavigationPanelProps } from "./types";

export const HistoryNavigationPanel = (props: HistoryNavigationPanelProps) => {
  const handleBackButtonClick = () => {
    sendTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    props.onGoBack();
  };

  const handleForwardButtonClick = () => {
    sendTrackingEvent(trackingEvents.FORWARD_BUTTON_CLICKED);
    props.onGoForward();
  };

  return (
    <s.Container>
      <s.Button onClick={handleBackButtonClick} disabled={props.isBackDisabled}>
        <ChevronIcon
          direction={Direction.LEFT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
      <s.Button
        onClick={handleForwardButtonClick}
        disabled={props.isForwardDisabled}
      >
        <ChevronIcon
          direction={Direction.RIGHT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
    </s.Container>
  );
};
