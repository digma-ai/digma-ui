import { actions as globalActions } from "../../../actions";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { CursorFollower } from "../../common/CursorFollower";
import { DigmaLogoIcon } from "../../common/icons/DigmaLogoIcon";
import { Button } from "../../common/v3/Button";
import * as s from "./styles";

const handleTroubleshootButtonClick = () => {
  sendUserActionTrackingEvent(
    globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED,
    {
      origin: "recent activity"
    }
  );

  window.sendMessageToDigma({
    action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
  });
};

export const NoData = () => (
  <s.NoDataContainer>
    <CursorFollower>
      <DigmaLogoIcon size={56} />
    </CursorFollower>
    <s.NoDataTextContainer>
      <s.NoDataTitle>No Recent Activity</s.NoDataTitle>
      Not seeing your application data?
    </s.NoDataTextContainer>
    <Button label={"Troubleshoot"} onClick={handleTroubleshootButtonClick} />
  </s.NoDataContainer>
);
