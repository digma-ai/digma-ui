import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeatureFlagValue } from "../../featureFlags";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useErrorsSelector } from "../../store/errors/useErrorsSelector";
import { useStore } from "../../store/useStore";
import { trackingEvents as globalEvents } from "../../trackingEvents";
import { isUndefined } from "../../typeGuards/isUndefined";
import { FeatureFlag } from "../../types";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { ErrorIcon } from "../common/icons/16px/ErrorIcon";
import { NewButton } from "../common/v3/NewButton";
import { NewEmptyState } from "../common/v3/NewEmptyState";
import { useHistory } from "../Main/useHistory";
import { TAB_IDS } from "../Navigation/Tabs/types";
import { ErrorDetails } from "./ErrorDetails";
import { ShowOnlyWorkspaceErrorStackTraceItemsPayload } from "./ErrorDetails/ErrorDetailsCardContent/FlowStack/types";
import { ErrorsList } from "./ErrorsList";
import { GlobalErrorsList } from "./GlobalErrorsList";
import * as s from "./styles";

const SHOW_ONLY_WORKSPACE_ERROR_STACK_TRACE_ITEMS_PERSISTENCE_KEY =
  "showOnlyWorkspaceErrorStackTraceItems";

export const Errors = () => {
  const [persistedShowWorkspaceItemsOnly, setPersistedShowWorkspaceItemsOnly] =
    usePersistence<ShowOnlyWorkspaceErrorStackTraceItemsPayload>(
      SHOW_ONLY_WORKSPACE_ERROR_STACK_TRACE_ITEMS_PERSISTENCE_KEY,
      "application"
    );
  const [
    isErrorDetailsWorkspaceItemsOnlyRehydrated,
    setIsErrorDetailsWorkspaceItemsOnlyRehydrated
  ] = useState(false);

  const previousPersistedShowWorkspaceItemsOnly = usePrevious(
    persistedShowWorkspaceItemsOnly
  );
  const { scope, backendInfo } = useConfigSelector();
  const { errorDetailsWorkspaceItemsOnly } = useErrorsSelector();
  const previousErrorDetailsWorkspaceItemsOnly = usePrevious(
    errorDetailsWorkspaceItemsOnly
  );
  const { setErrorDetailsWorkspaceItemsOnly } = useStore.getState();
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  const methodId = scope?.span?.methodId ?? undefined;
  const { goTo } = useHistory();
  const params = useParams();
  const selectedErrorId = params.id;
  const isGlobalErrorsViewEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_GLOBAL_ERRORS_ENABLED
  );

  // Rehydrate "Workspace only" toggle value from persistence
  useEffect(() => {
    if (
      isUndefined(previousPersistedShowWorkspaceItemsOnly) &&
      !isUndefined(persistedShowWorkspaceItemsOnly)
    ) {
      setErrorDetailsWorkspaceItemsOnly(
        Boolean(persistedShowWorkspaceItemsOnly?.value)
      );
      setIsErrorDetailsWorkspaceItemsOnlyRehydrated(true);
    }
  }, [
    persistedShowWorkspaceItemsOnly,
    previousPersistedShowWorkspaceItemsOnly,
    setErrorDetailsWorkspaceItemsOnly
  ]);

  // Persist "Workspace only" toggle value on its change
  useEffect(() => {
    if (
      previousErrorDetailsWorkspaceItemsOnly !==
        errorDetailsWorkspaceItemsOnly &&
      isErrorDetailsWorkspaceItemsOnlyRehydrated
    ) {
      setPersistedShowWorkspaceItemsOnly({
        value: errorDetailsWorkspaceItemsOnly
      });
    }
  }, [
    previousErrorDetailsWorkspaceItemsOnly,
    errorDetailsWorkspaceItemsOnly,
    setPersistedShowWorkspaceItemsOnly,
    isErrorDetailsWorkspaceItemsOnlyRehydrated
  ]);

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
