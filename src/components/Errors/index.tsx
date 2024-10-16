import { useParams } from "react-router-dom";
import { getFeatureFlagValue } from "../../featureFlags";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { trackingEvents as globalEvents } from "../../trackingEvents";
import { FeatureFlag } from "../../types";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { ErrorIcon } from "../common/icons/16px/ErrorIcon";
import { NewButton } from "../common/v3/NewButton";
import { NewEmptyState } from "../common/v3/NewEmptyState";
import { useHistory } from "../Main/useHistory";
import { TAB_IDS } from "../Navigation/Tabs/types";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import { GlobalErrorsList } from "./GlobalErrorsList";
import * as s from "./styles";

export const Errors = () => {
  const { scope, backendInfo } = useConfigSelector();
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  const methodId = scope?.span?.methodId ?? undefined;
  const { goTo } = useHistory();
  const params = useParams();
  const selectedErrorId = params.id;
  const isGlobalErrorsViewEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_GLOBAL_ERRORS_ENABLED
  );

  const handleErrorSelect = (errorId: string) => {
    goTo(errorId);
  };

  const handleGoToAllErrors = () => {
    goTo("..");
  };

  const handleSeeAllAssetsClick = () => {
    sendUserActionTrackingEvent(globalEvents.GO_TO_ALL_ASSETS_CLICKED, {
      source: "Error tab"
    });
    goTo(`/${TAB_IDS.ASSETS}`);
  };

  const renderContent = () => {
    if (selectedErrorId) {
      return (
        <ErrorDetails
          id={selectedErrorId}
          onGoToAllErrors={handleGoToAllErrors}
        />
      );
    }

    if (!spanCodeObjectId) {
      if (isGlobalErrorsViewEnabled) {
        return <GlobalErrorsList />;
      }

      return (
        <s.EmptyStateContainer>
          <NewEmptyState
            icon={ErrorIcon}
            title={"Select an asset to view errors"}
            content={
              <>
                <s.EmptyStateTextContainer>
                  <span>The Errors tab shows details for</span>
                  <span>exceptions for each Digma-tracked</span>
                  <span>asset. See all tracked assets on the</span>
                  <span>Assets page.</span>
                </s.EmptyStateTextContainer>
                <NewButton
                  buttonType={"primary"}
                  onClick={handleSeeAllAssetsClick}
                  label={"See all assets"}
                />
              </>
            }
          />
        </s.EmptyStateContainer>
      );
    }

    return (
      <ErrorsList
        onErrorSelect={handleErrorSelect}
        spanCodeObjectId={spanCodeObjectId}
        methodId={methodId}
      />
    );
  };

  return <s.Container>{renderContent()}</s.Container>;
};
