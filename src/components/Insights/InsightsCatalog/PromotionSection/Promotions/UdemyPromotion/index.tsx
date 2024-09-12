import { useState } from "react";
import { createPortal } from "react-dom";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { CancelConfirmation } from "../../../../../common/CancelConfirmation";
import { MAIN_CONTAINER_ID } from "../../../../../Main";
import { UdemyRegistrationCard } from "../../../../../Main/RegistrationCard/UdemyRegistrationCard";
import { MainOverlay } from "../../../../../Main/styles";
import { trackingEvents as mainTrackingEvents } from "../../../../../Main/tracking";
import { UdemyCoursePromotionCard } from "../../../PromotionCard/UdemyCoursePromotionCard";
import { PromotionProps } from "../types";

export const UdemyPromotion = ({ onDiscard, onAccept }: PromotionProps) => {
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const mainContainer = document.getElementById(MAIN_CONTAINER_ID);
  const handleRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_SUBMITTED
    );
    onAccept();
  };

  const handleRegistrationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_CLOSE_BUTTON_CLICKED
    );
    setShowRegistration(false);
  };

  const handlePromotionAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_OPENED
    );
    setShowRegistration(true);
  };

  const handlePromotionDiscard = () => {
    sendUserActionTrackingEvent(mainTrackingEvents.PROMOTION_DISCARDED);
    setShowDiscardConfirmation(true);
  };

  const handleConfirmationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const handleCancelConfirmationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const handleCancelConfirmationAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED
    );
    onDiscard();
    setShowDiscardConfirmation(false);
  };
  return (
    <>
      <UdemyCoursePromotionCard
        onAccept={handlePromotionAccept}
        onDiscard={handlePromotionDiscard}
      />

      {mainContainer &&
        createPortal(
          <UdemyRegistrationCard
            onClose={handleRegistrationClose}
            onComplete={handleRegistrationComplete}
            show={showRegistration}
          />,
          mainContainer
        )}

      {mainContainer &&
        showDiscardConfirmation &&
        createPortal(
          <MainOverlay onClose={handleConfirmationClose} tabIndex={-1}>
            <CancelConfirmation
              header={"Discard offer?"}
              description={
                "Are you sure you want to miss out on this exclusive, limited-time offer?"
              }
              cancelBtnText={"Yes, discard"}
              onClose={handleCancelConfirmationClose}
              onCancel={handleCancelConfirmationAccept}
            />
          </MainOverlay>,
          mainContainer
        )}
    </>
  );
};
