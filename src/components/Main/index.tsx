import { useContext, useLayoutEffect, useState } from "react";
import { ROUTES } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { usePersistence } from "../../hooks/usePersistence";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { Assets } from "../Assets";
import { Errors } from "../Errors";
import { Highlights } from "../Highlights";
import { Insights } from "../Insights";
import { Navigation } from "../Navigation";
import { SetViewsPayload } from "../Navigation/types";
import { Tests } from "../Tests";
import { ConfigContext } from "../common/App/ConfigContext";
import { CancelConfirmation } from "../common/CancelConfirmation";
import { Authentication } from "./Authentication";
import { RegistrationCard } from "./RegistrationCard";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { ViewData } from "./types";

const PROMOTION_KEY = "PROMOTION";
const PROMOTION_COMPLETED_KEY = "PROMOTION_COMPLETED";
const PROMOTION_DELAY_IN_DAYS = 30;

const getDaysDiff = (left: number, right: number) => {
  const DifferenceInTime = new Date(left).valueOf() - new Date(right).valueOf();
  const DifferenceInDays = Math.ceil(DifferenceInTime / (1000 * 3600 * 24));
  return Math.abs(DifferenceInDays);
};

export const Main = () => {
  const [view, setView] = useState<ViewData>({ id: ROUTES.INSIGHTS });
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const config = useContext(ConfigContext);
  const [dismissalDate, setDismissalDate] = usePersistence<number>(
    PROMOTION_KEY,
    "application"
  );
  const [promotionCompleted, setPromotionCompleted] = usePersistence<boolean>(
    PROMOTION_COMPLETED_KEY,
    "application"
  );

  const hidePromotion =
    dismissalDate &&
    getDaysDiff(dismissalDate, Date.now()) < PROMOTION_DELAY_IN_DAYS;

  const handleRegistrationCompleted = () => {
    sendTrackingEvent(trackingEvents.PROMOTION_REGISTRATION_SUBMITTED);
    setPromotionCompleted(true);
  };

  const handleRegistrationClose = () => {
    sendTrackingEvent(trackingEvents.PROMOTION_REGISTRATION_CLOSED_CLICKED);
    setShowRegistration(false);
  };

  const handleCloseCancelConfirmation = () => {
    sendTrackingEvent(
      trackingEvents.PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const handleShowPromotionOpen = () => {
    sendTrackingEvent(trackingEvents.PROMOTION_REGISTRATION_OPENED);
    setShowRegistration(true);
  };

  const handlePromotionDiscard = () => {
    sendTrackingEvent(trackingEvents.PROMOTION_DISCARDED);
    setShowDiscardConfirmation(true);
  };

  const handleAcceptCancelConfirmation = () => {
    sendTrackingEvent(
      trackingEvents.PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED
    );
    setDismissalDate(Date.now());
    setShowDiscardConfirmation(false);
  };

  const handleConfirmationClosed = () => {
    setShowDiscardConfirmation(false);
  };

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleSetViewsData = (data: unknown) => {
      const payload = data as SetViewsPayload;
      const view = payload.views.find((x) => x.isSelected);
      if (view) {
        setView({ id: view.id, path: view.path });
      }
    };

    dispatcher.addActionListener(actions.SET_VIEWS, handleSetViewsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_VIEWS, handleSetViewsData);
    };
  }, [config.userInfo?.id]);

  if (!config.userInfo?.id && config.backendInfo?.centralize) {
    return <Authentication />;
  }

  const renderContent = () => {
    switch (view.id) {
      case ROUTES.HIGHLIGHTS:
        return <Highlights />;
      case ROUTES.INSIGHTS:
        return (
          <Insights
            insightViewType={"Issues"}
            key={"insights"}
            onShowPromotion={handleShowPromotionOpen}
            onShowPromotionConfirmationDiscard={handlePromotionDiscard}
            hidePromotion={
              Boolean(hidePromotion) || Boolean(promotionCompleted)
            }
          />
        );
      case ROUTES.ASSETS:
        return <Assets selectedTypeId={view.path} />;
      case ROUTES.ANALYTICS:
        return <Insights insightViewType={"Analytics"} key={"analytics"} />;
      case ROUTES.ERRORS:
        return <Errors errorId={view.path} />;
      case ROUTES.TESTS:
        return <Tests />;
      default:
        return null;
    }
  };

  return (
    <s.Container>
      <Navigation />
      <s.ContentContainer>{renderContent()}</s.ContentContainer>
      {showDiscardConfirmation && (
        <s.StyledOverlay onClose={handleConfirmationClosed} tabIndex={-1}>
          <CancelConfirmation
            header="Discard offer?"
            description="Are you sure you want to miss out on this exclusive, limited-time offer?"
            cancelBtnText="Yes, discard"
            onClose={handleCloseCancelConfirmation}
            onCancel={handleAcceptCancelConfirmation}
          />
        </s.StyledOverlay>
      )}

      <RegistrationCard
        onClose={handleRegistrationClose}
        onComplete={handleRegistrationCompleted}
        show={showRegistration}
      />
    </s.Container>
  );
};
