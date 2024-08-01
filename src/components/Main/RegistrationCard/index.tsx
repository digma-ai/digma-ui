import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { trackingEvents } from "../tracking";
import { RegistrationPromoImage } from "./Images/RegistrationPromoImage";
import { SuccessRegistration } from "./SuccessRegistration";
import * as s from "./styles";
import { RegistrationCardProps } from "./types";

const TRANSITION_CLASS_NAME = "registration-card";
const DEFAULT_TRANSITION_DURATION = 1000;

export const RegistrationCard = ({
  onClose,
  onComplete,
  className,
  show
}: RegistrationCardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const registrationCardRef = useRef<HTMLDivElement>(null);

  const handleSlackLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.PROMOTION_REGISTRATION_CARD_SLACK_LINK_CLICKED
    );
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleRegistrationClose = () => {
    onClose();
  };

  const handleAnimationOnEnter = () => {
    setShowOverlay(true);
  };

  const handleAnimationOnExit = () => {
    setShowOverlay(false);
  };

  const handleOnRegistrationExit = () => {
    setIsFormCompleted(true);
    onComplete();
  };

  return (
    <CSSTransition
      in={show}
      timeout={DEFAULT_TRANSITION_DURATION}
      classNames={TRANSITION_CLASS_NAME}
      unmountOnExit={true}
      mountOnEnter={true}
      nodeRef={registrationCardRef}
      onEnter={handleAnimationOnEnter}
      onExited={handleAnimationOnExit}
    >
      <s.StyledOverlay
        onClose={handleRegistrationClose}
        tabIndex={-1}
        $isVisible={showOverlay}
      >
        <s.Container
          $transitionClassName={TRANSITION_CLASS_NAME}
          $transitionDuration={DEFAULT_TRANSITION_DURATION}
          className={className}
          ref={registrationCardRef}
        >
          <s.CrossButton
            buttonType={"tertiary"}
            icon={CrossIcon}
            onClick={onClose}
          />

          {!isFormCompleted ? (
            <>
              <div>
                <RegistrationPromoImage />
              </div>
              <s.FormContainer>
                <s.Description>
                  Enter your email address below, and we will send you
                  instructions to access the exclusive Digma course on Udemy
                </s.Description>
                <s.Register
                  scope={"promotion"}
                  alwaysRenderError={true}
                  onNext={handleOnRegistrationExit}
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
      </s.StyledOverlay>
    </CSSTransition>
  );
};
