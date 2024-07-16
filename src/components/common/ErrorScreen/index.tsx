import { trackingEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { DigmaLogoIcon } from "../icons/DigmaLogoIcon";
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
      <DigmaLogoIcon size={73} />
      <s.TextContainer>
        <s.Title>Something went wrong</s.Title>
        <span>Click Refresh to reload the plugin</span>
      </s.TextContainer>
      <NewButton onClick={onRefreshButtonClick} label={"Refresh"} />
    </s.Container>
  );
};
