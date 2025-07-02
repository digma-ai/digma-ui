import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMount } from "../../hooks/useMount";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import type { GlobalErrorsSelectedFiltersState } from "../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../store/errors/useErrorsSelector";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { changeScope } from "../../utils/actions/changeScope";
import { useHistory } from "../Main/useHistory";
import { TAB_IDS } from "../Navigation/Tabs/types";
import type { ShowOnlyWorkspaceErrorStackTraceItemsPayload } from "./ErrorDetails/ErrorDetailsCardContent/FlowStack/types";
import { ErrorsContent } from "./ErrorsContent";

const PERSISTENCE_KEY = "globalErrorsFilters";
const SHOW_ONLY_WORKSPACE_ERROR_STACK_TRACE_ITEMS_PERSISTENCE_KEY =
  "showOnlyWorkspaceErrorStackTraceItems";

export const Errors = () => {
  const [persistedFilters, setPersistedFilters] =
    usePersistence<GlobalErrorsSelectedFiltersState>(
      PERSISTENCE_KEY,
      "project"
    );
  const previousPersistedFilters = usePrevious(persistedFilters);
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
  const { scope, backendInfo, selectedServices, environment } =
    useConfigSelector();
  const { errorDetailsWorkspaceItemsOnly, globalErrorsSelectedFilters } =
    useErrorsSelector();
  const previousErrorDetailsWorkspaceItemsOnly = usePrevious(
    errorDetailsWorkspaceItemsOnly
  );
  const {
    setErrorDetailsWorkspaceItemsOnly,
    setGlobalErrorsSelectedFilters,
    resetGlobalErrors
  } = useStore.getState();
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  const methodId = scope?.span?.methodId ?? undefined;
  const { goTo } = useHistory();
  const params = useParams();
  const selectedErrorId = params.id;
  const isInitialized = Boolean(globalErrorsSelectedFilters);

  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      setGlobalErrorsSelectedFilters(
        persistedFilters ?? {
          endpoints: [],
          errorTypes: [],
          criticalities: [],
          handlingTypes: []
        }
      );
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    selectedServices,
    setGlobalErrorsSelectedFilters
  ]);

  // Update persisted filters on filters change
  useEffect(() => {
    if (isInitialized) {
      setPersistedFilters(globalErrorsSelectedFilters);
    }
  }, [isInitialized, globalErrorsSelectedFilters, setPersistedFilters]);

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

  // TODO: replace with useEffect
  // Cleanup errors store slice on unmount
  useMount(() => {
    return () => {
      resetGlobalErrors();
    };
  });

  const handleErrorSelect = (errorId: string) => {
    goTo(errorId);
  };

  const handleGoToAllErrors = () => {
    goTo("..");
  };

  const handleGoToAssets = () => {
    goTo(`/${TAB_IDS.ASSETS}`);
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <ErrorsContent
      onGoToAssets={handleGoToAssets}
      onGoToErrors={handleGoToAllErrors}
      onErrorSelect={handleErrorSelect}
      spanCodeObjectId={spanCodeObjectId}
      methodId={methodId}
      errorId={selectedErrorId}
      backendInfo={backendInfo}
      selectedServices={selectedServices ?? undefined}
      onScopeChange={changeScope}
      environmentId={environment?.id}
    />
  );
};
