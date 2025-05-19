import { getFeatureFlagValue } from "../../../featureFlags";
import { trackingEvents as globalEvents } from "../../../trackingEvents";
import { FeatureFlag } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewButton } from "../../common/v3/NewButton";
import { EmptyState } from "../EmptyState";
import { ErrorDetails } from "../ErrorDetails";
import { ErrorsList } from "../ErrorsList";
import { GlobalErrorsList } from "../GlobalErrorsList";
import * as s from "./styles";
import type { ErrorsContentProps } from "./types";

export const ErrorsContent = ({
  onGoToAssets,
  onGoToErrors,
  onErrorSelect,
  errorId,
  spanCodeObjectId,
  methodId,
  backendInfo,
  className,
  environmentId,
  selectedServices,
  onScopeChange
}: ErrorsContentProps) => {
  const isGlobalErrorsViewEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreGlobalErrorsEnabled
  );

  const handleSeeAllAssetsClick = () => {
    sendUserActionTrackingEvent(globalEvents.GO_TO_ALL_ASSETS_CLICKED, {
      source: "Error tab"
    });
    onGoToAssets();
  };

  const renderContent = () => {
    if (errorId) {
      return <ErrorDetails id={errorId} onGoToAllErrors={onGoToErrors} />;
    }

    if (!spanCodeObjectId) {
      if (isGlobalErrorsViewEnabled) {
        return (
          <GlobalErrorsList
            backendInfo={backendInfo}
            environmentId={environmentId}
            services={selectedServices}
            spanCodeObjectId={spanCodeObjectId}
            onScopeChange={onScopeChange}
            onErrorSelect={onErrorSelect}
          />
        );
      }

      return (
        <EmptyState
          preset={"selectAsset"}
          customContent={
            <NewButton
              buttonType={"primary"}
              onClick={handleSeeAllAssetsClick}
              label={"See all assets"}
            />
          }
        />
      );
    }

    return (
      <ErrorsList
        onErrorSelect={onErrorSelect}
        spanCodeObjectId={spanCodeObjectId}
        methodId={methodId}
        environmentId={environmentId}
      />
    );
  };

  return <s.Container className={className}>{renderContent()}</s.Container>;
};
