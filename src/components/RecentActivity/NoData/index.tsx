import { actions as globalActions } from "../../../actions";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { CursorFollower } from "../../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../../common/icons/DigmaLogoFlatIcon";
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
      <DigmaLogoFlatIcon size={64} />
    </CursorFollower>
    <s.NoDataTitle>No Recent Activity</s.NoDataTitle>
    <s.NoDataText>Not seeing your application data?</s.NoDataText>
    <s.TroubleshootButton
      buttonType={"primary"}
      label={"Troubleshoot"}
      onClick={handleTroubleshootButtonClick}
    />
  </s.NoDataContainer>
);
