import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ChevronIcon } from "../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { HistoryNavigationPanelProps } from "./types";

export const HistoryNavigationPanel = (props: HistoryNavigationPanelProps) => {
  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    props.onGoBack();
  };

  const handleForwardButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FORWARD_BUTTON_CLICKED);
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
