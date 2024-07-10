import { trackingEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewButton } from "../v3/NewButton";
import * as s from "./styles";

export const ErrorScreen = () => {
  const onRefreshButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ERROR_SCREEN_REFRESH_BUTTON_CLICKED
    );
    window.location.href = "/";
  };

  return (
    <s.Container>
      <span>Oops, something went wrong</span>
      <NewButton onClick={onRefreshButtonClick} label={"Refresh"} />
    </s.Container>
  );
};
