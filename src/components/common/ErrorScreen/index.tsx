import type { Platform } from "../../../globals";
import { platform } from "../../../platform";
import { trackingEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { DigmaLogoIcon } from "../icons/DigmaLogoIcon";
import { NewButton } from "../v3/NewButton";
import * as s from "./styles";

const getMessage = (platform: Platform | null) => {
  let substring = "";
  switch (platform) {
    case "JetBrains":
    case "Visual Studio":
    case "VS Code":
      substring = "plugin";
      break;
    case "Web":
      substring = "page";
      break;
  }

  return substring ? `Click Refresh to reload the ${substring}` : "";
};

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
        <span>{getMessage(platform)}</span>
      </s.TextContainer>
      <NewButton onClick={onRefreshButtonClick} label={"Refresh"} />
    </s.Container>
  );
};
