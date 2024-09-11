import { useState } from "react";
import { createPortal } from "react-dom";
import { usePersistence } from "../../../../hooks/usePersistence";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { MAIN_CONTAINER_ID } from "../../../Main";
import { EarlyAccessRegistrationCard } from "../../../Main/RegistrationCard/EarlyAccessRegistrationCard";
import { UdemyRegistrationCard } from "../../../Main/RegistrationCard/UdemyRegistrationCard";
import { MainOverlay } from "../../../Main/styles";
import { trackingEvents as mainTrackingEvents } from "../../../Main/tracking";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import { UdemyCoursePromotionCard } from "../PromotionCard/UdemyCoursePromotionCard";
import { ToolbarRow } from "../styles";
import { PromotionType } from "./types";

const PROMOTION_PERSISTENCE_KEY = "PROMOTION";
const PROMOTION_COMPLETED_PERSISTENCE_KEY = "PROMOTION_COMPLETED";

const isPromotionEnabled = (dismissalDate: number | null | undefined) => {
  const PROMOTION_INTERVAL = 30 * 24 * 60 * 60 * 1000; // in milliseconds

  return (
    !dismissalDate || Math.abs(dismissalDate - Date.now()) > PROMOTION_INTERVAL
  );
};

export const PromotionSection = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [promotionCompleted, setPromotionCompleted] = usePersistence<boolean>(
    PROMOTION_COMPLETED_PERSISTENCE_KEY,
    "application"
  );
  const [dismissalDate, setDismissalDate] = usePersistence<number>(
    PROMOTION_PERSISTENCE_KEY,
    "application"
  );

  const mainContainer = document.getElementById(MAIN_CONTAINER_ID);
  const handleUdemyRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_SUBMITTED
    );
    setPromotionCompleted(true);
  };

  const handleUdemyRegistrationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_CLOSE_BUTTON_CLICKED
    );
    setShowRegistration(false);
  };

  const handleEarlyAccessRegistrationComplete = () => {
    // sendUserActionTrackingEvent(
    //   mainTrackingEvents.PROMOTION_REGISTRATION_FORM_SUBMITTED
    // );
    setPromotionCompleted(true);
  };

  const handleEarlyAccessRegistrationClose = () => {
    // sendUserActionTrackingEvent(
    //   mainTrackingEvents.PROMOTION_REGISTRATION_CLOSE_BUTTON_CLICKED
    // );
    setShowRegistration(false);
  };

  const handlePromotionAccept = (source: PromotionType) => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_OPENED,
      {
        source
      }
    );
    setShowRegistration(true);
  };

  const handlePromotionDiscard = (source: PromotionType) => {
    sendUserActionTrackingEvent(mainTrackingEvents.PROMOTION_DISCARDED, {
      source
    });
    setShowDiscardConfirmation(true);
  };

  const handleCancelConfirmationAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED
    );
    setDismissalDate(Date.now());
    setShowDiscardConfirmation(false);
  };

  const handleConfirmationClose = () => {
    setShowDiscardConfirmation(false);
  };

  const handleCancelConfirmationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const isPromotionVisible =
    !promotionCompleted && isPromotionEnabled(dismissalDate);

  return (
    <>
      {isPromotionVisible && (
        <ToolbarRow>
          <UdemyCoursePromotionCard
            onAccept={() => handlePromotionAccept("udemy")}
            onDiscard={() => handlePromotionDiscard("udemy")}
          />
        </ToolbarRow>
      )}

      {mainContainer &&
        createPortal(
          <UdemyRegistrationCard
            onClose={handleUdemyRegistrationClose}
            onComplete={handleUdemyRegistrationComplete}
            show={showRegistration}
          />,
          mainContainer
        )}

      {mainContainer &&
        createPortal(
          <EarlyAccessRegistrationCard
            onClose={handleEarlyAccessRegistrationClose}
            onComplete={handleEarlyAccessRegistrationComplete}
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
