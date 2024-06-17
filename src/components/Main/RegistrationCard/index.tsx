import { ForwardedRef, forwardRef, useState } from "react";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { trackingEvents } from "../tracking";
import { RegistrationPromoIcon } from "./Icons/RegistrationPromoIcon";
import { SuccessRegistration } from "./SuccessRegistration";
import * as s from "./styles";
import { RegistrationCardProps } from "./types";

const RegistrationCardComponent = (
  { onClose, onComplete, className }: RegistrationCardProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const handleSlackLinkClick = () => {
    sendTrackingEvent(trackingEvents.PROMOTION_SLACK_LINK_CLICKED);
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  return (
    <s.Container className={className} ref={ref}>
      <s.CrossButton
        buttonType={"tertiary"}
        icon={() => <CrossIcon className="currentColor" size={20} />}
        onClick={onClose}
      />
      {!isFormCompleted ? (
        <>
          <RegistrationPromoIcon />
          <s.FormContainer>
            <s.Description>
              Enter your email address below, and we will send you instructions
              to access the exclusive Digma course on Udemy
            </s.Description>
            <s.Register
              scope="promotion"
              alwaysRenderError={true}
              onNext={() => {
                setIsFormCompleted(true);
                onComplete();
              }}
            />
          </s.FormContainer>
        </>
      ) : (
        <SuccessRegistration />
      )}

      <s.SlackLink onClick={handleSlackLinkClick}>
        <SlackLogoIcon size={14} />
        Join our Digma channel
      </s.SlackLink>
    </s.Container>
  );
};

export const RegistrationCard = forwardRef(RegistrationCardComponent);
