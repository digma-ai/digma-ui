import { NavigateOptions, To, resolvePath } from "react-router-dom";
import { history } from "../../containers/Main/history";
import { useGlobalStore } from "../../containers/Main/stores/useGlobalStore";
import { HistoryEntry, HistoryEntryLocation } from "../../history/History";
import { isString } from "../../typeGuards/isString";
import { HistoryState } from "./types";

const isLocationChanged = (to: To, location: HistoryEntryLocation) => {
  const newResolvedPath = resolvePath(to, location.pathname);

  if (isString(to)) {
    return newResolvedPath.pathname !== location.pathname;
  }

  return (
    newResolvedPath.pathname !== location.pathname ||
    to.search !== location.search
  );
};

const isEnvironmentChanged = (
  optionsState: HistoryState | undefined,
  locationState: HistoryState | undefined
) => {
  if (!optionsState) {
    return false;
  }

  if (!optionsState.environmentId) {
    return false;
  }

  return optionsState.environmentId !== locationState?.environmentId;
};

const isScopeChanged = (
  optionsState: HistoryState | undefined,
  locationState: HistoryState | undefined
) => {
  if (!optionsState) {
    return false;
  }

  return optionsState.spanCodeObjectId !== locationState?.spanCodeObjectId;
};

const isNavigationNeeded = (
  to: To,
  options: NavigateOptions | undefined,
  currentHistoryEntry: HistoryEntry<HistoryState> | null
) => {
  if (!currentHistoryEntry) {
    return true;
  }

  const optionsState = options?.state as HistoryState | undefined;

  // No need to navigate if the location, environment and scope are the same
  return (
    isLocationChanged(to, currentHistoryEntry.location) ||
    isEnvironmentChanged(optionsState, currentHistoryEntry.state) ||
    isScopeChanged(optionsState, currentHistoryEntry.state)
  );
};

const isNewHistoryEntryNeeded = (
  to: To,
  options: NavigateOptions | undefined,
  currentHistoryEntry: HistoryEntry<HistoryState> | null
) => {
  if (!currentHistoryEntry) {
    return true;
  }

  if (options?.replace) {
    return false;
  }

  const optionsState = options?.state as HistoryState | undefined;

  // No need to create a new history entry if the are no selected environment yet
  if (!currentHistoryEntry?.state?.environmentId) {
    return false;
  }

  // No need to create a new history entry if only environment is changed
  if (
    !isLocationChanged(to, currentHistoryEntry?.location) &&
    !isScopeChanged(optionsState, currentHistoryEntry?.state)
  ) {
    return false;
  }

  return true;
};

export const useHistory = () => {
  const currentHistoryEntry = history.getCurrentLocation();
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  // const assetsStore = useAssetsStore();

  const goTo = (to: To, options?: NavigateOptions) => {
    // // Persist the assets state in the current history entry
    // if (currentHistoryEntry) {
    //   history.historyStack[history.currentIndex] = {
    //     ...currentHistoryEntry,
    //     state: {
    //       ...currentHistoryEntry.state,
    //       assets: {
    //         filters: assetsStore.filters,
    //         sorting: assetsStore.sorting,
    //         search: assetsStore.search,
    //         page: assetsStore.page,
    //         viewMode: assetsStore.viewMode
    //       }
    //     }
    //   };
    // }

    // Reset the assets store
    // assetsStore.reset();

    if (!isNavigationNeeded(to, options, currentHistoryEntry)) {
      return;
    }

    const isNewHistoryEntry = isNewHistoryEntryNeeded(
      to,
      options,
      currentHistoryEntry
    );

    const optionsState = options?.state as HistoryState | undefined;
    const state: HistoryState = optionsState ?? {
      environmentId: environment?.id,
      spanCodeObjectId: scopeSpanCodeObjectId,
      spanDisplayName: scopeSpanCodeObjectId
        ? scope?.span?.displayName
          ? scope.span.displayName
          : currentHistoryEntry?.state?.spanDisplayName
        : undefined
    };

    const resolvedPath = resolvePath(
      to,
      currentHistoryEntry?.location.pathname ?? "/"
    );
    const historyLocation: HistoryEntryLocation = {
      pathname: resolvedPath.pathname,
      search: resolvedPath.search
    };

    if (isNewHistoryEntry) {
      history.pushEntry(historyLocation, state);
    } else {
      history.replaceEntry(historyLocation, state);
    }
  };

  return {
    goTo,
    canGoBack: history.canGoBack(),
    canGoForward: history.canGoForward(),
    goBack: () => history.goBack(),
    goForward: () => history.goForward()
  };
};
