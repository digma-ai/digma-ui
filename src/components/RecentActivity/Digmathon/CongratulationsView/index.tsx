import { useEffect } from "react";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CheckmarkCircleIcon } from "../../../common/icons/12px/CheckmarkCircleIcon";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";

const EMAIL_ADDRESS = "contact@digma.ai";
const EMAIL_SUBJECT = "Digmathon";

export const CongratulationsView = () => {
  const handleContactLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_VIEW_CONTACT_LINK_CLICKED
    );

    const body = "";
    const url = `mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${body}`;
    openURLInDefaultBrowser(url);
  };

  useEffect(() => {
    sendTrackingEvent(trackingEvents.DIGMATHON_CONGRATULATIONS_VIEWED);
  }, []);

  return (
    <s.Container>
      <s.IconContainer>
        <CheckmarkCircleIcon size={20} color={"currentColor"} />
      </s.IconContainer>
      <s.TextContainer>
        <s.Title>Congratulations!</s.Title>
        You&apos;ve successfully found all the issues. To claim your prize,
        please send us an email with your name and &quot;Digmathon&quot; as the
        subject line.
      </s.TextContainer>
      <s.ContactLink onClick={handleContactLinkClick}>
        contact@digma.ai
      </s.ContactLink>
    </s.Container>
  );
};
