import { actions as globalActions } from "../../../actions";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { EmptyState } from "../../common/EmptyState";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { CardsIcon } from "../../common/icons/CardsIcon";
import * as s from "./styles";
import { NoDataMessageProps } from "./types";

export const NoDataMessage = (props: NoDataMessageProps) => {
  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "assets"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  let content: JSX.Element | null = null;

  switch (props.type) {
    case "loading":
      content = <NewCircleLoader size={32} />;
      break;
    case "noDataYet":
      content = (
        <EmptyState
          icon={CardsIcon}
          title={"No data yet"}
          content={
            <>
              <s.EmptyStateDescription>
                Trigger actions that call this application to learn more about
                its runtime behavior
              </s.EmptyStateDescription>
              <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
                Not seeing your application data?
              </s.TroubleshootingLink>
            </>
          }
        />
      );
      break;
    case "noSearchResults":
      content = (
        <EmptyState
          icon={CardsIcon}
          title={"No results"}
          content={
            <s.EmptyStateDescription>
              It seems there are no assets matching your selected filters at the
              moment
            </s.EmptyStateDescription>
          }
        />
      );
  }

  return <s.NoDataContainer>{content}</s.NoDataContainer>;
};
