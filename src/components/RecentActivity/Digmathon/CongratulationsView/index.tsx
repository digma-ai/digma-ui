import { useContext, useEffect } from "react";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { CheckmarkCircleIcon } from "../../../common/icons/12px/CheckmarkCircleIcon";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { CongratulationsViewProps } from "./types";

const EMAIL_ADDRESS = "digmathon@digma.ai";

export const CongratulationsView = ({ insights }: CongratulationsViewProps) => {
  const config = useContext(ConfigContext);

  const handleContactLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_VIEW_CONTACT_LINK_CLICKED
    );

    const userId = config.userId || config.userRegistrationEmail || "";
    const subject = `Digmathon Challenge Completed! [${userId}]`;

    const foundInsights = insights
      .filter((x) => x.isFound)
      .map((x) => x.data?.title || x.type)
      .join(", ");
    const body = [
      "Insights found:",
      foundInsights,
      "Please send back the reward to this email!"
    ].join("%0D%0A%0D%0A");

    const url = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
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
        {EMAIL_ADDRESS}
      </s.ContactLink>
    </s.Container>
  );
};
