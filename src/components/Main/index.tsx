import { useContext, useLayoutEffect, useState } from "react";
import { ROUTES } from "../../constants";
import { dispatcher } from "../../dispatcher";
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
import { ViewData } from "./types";

export const Main = () => {
  const [view, setView] = useState<ViewData>({ id: ROUTES.INSIGHTS });
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const config = useContext(ConfigContext);

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
            onShowPromotion={() => setShowRegistration(true)}
            onShowPromotionConfirmationDiscard={() =>
              setShowDiscardConfirmation(true)
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
        <s.StyledOverlay
          onClose={() => setShowDiscardConfirmation(false)}
          tabIndex={-1}
        >
          <CancelConfirmation
            header="Discard offer?"
            description="Are you sure you want to miss out on this exclusive, limited-time offer?"
            cancelBtnText="Yes, discard"
            onClose={() => {
              setShowDiscardConfirmation(false);
            }}
            onCancel={() => {
              setShowDiscardConfirmation(false);
            }}
          />
        </s.StyledOverlay>
      )}

      {showRegistration && (
        <s.StyledOverlay
          onClose={() => setShowRegistration(false)}
          tabIndex={-1}
        >
          <RegistrationCard onClose={() => setShowRegistration(false)} />
        </s.StyledOverlay>
      )}
    </s.Container>
  );
};
