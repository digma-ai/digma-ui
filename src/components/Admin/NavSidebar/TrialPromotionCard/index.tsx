import { BOOK_DEMO_URL } from "../../../../constants";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";

export const TrialPromotionCard = () => {
  const handleStartNowButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TRIAL_PROMOTION_CARD_START_NOW_BUTTON_CLICKED
    );
    openURLInDefaultBrowser(BOOK_DEMO_URL);
  };

  return (
    <s.Container>
      <s.Illustration
        src={"/assets/images/promotion/start-trial/background.svg"}
      />
      <s.ContentContainer>
        <s.TextContainer>
          <s.Title>Start using Digma</s.Title>
          <s.Description>
            Start Digma for Teams and get 30-days free trial!
          </s.Description>
        </s.TextContainer>
        <s.StartButton
          label={"Start now"}
          onClick={handleStartNowButtonClick}
        />
      </s.ContentContainer>
    </s.Container>
  );
};
