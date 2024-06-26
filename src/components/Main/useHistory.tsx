import { useContext } from "react";
import { NavigateOptions, To, resolvePath } from "react-router-dom";
import { history } from "../../containers/Main/history";
import { HistoryEntry, HistoryEntryLocation } from "../../history/History";
import { isString } from "../../typeGuards/isString";
import { ConfigContext } from "../common/App/ConfigContext";
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
  location: HistoryEntry<HistoryState> | null
) => {
  if (!location) {
    return true;
  }

  const optionsState = options?.state as HistoryState | undefined;

  // No need to navigate if the location, environment and scope are the same
  return (
    isLocationChanged(to, location.location) ||
    isEnvironmentChanged(optionsState, location.state) ||
    isScopeChanged(optionsState, location.state)
  );
};

const isNewHistoryEntryNeeded = (
  to: To,
  options: NavigateOptions | undefined,
  location: HistoryEntry<HistoryState> | null
) => {
  if (!location) {
    return true;
  }

  if (options?.replace) {
    return false;
  }

  const optionsState = options?.state as HistoryState | undefined;

  // No need to create a new history entry if the are no selected environment yet
  if (!location?.state?.environmentId) {
    return false;
  }

  // No need to create a new history entry if only environment is changed
  if (
    !isLocationChanged(to, location?.location) &&
    !isScopeChanged(optionsState, location?.state)
  ) {
    return false;
  }

  return true;
};

export const useHistory = () => {
  const location = history.getCurrentLocation();
  const config = useContext(ConfigContext);

  const goTo = (to: To, options?: NavigateOptions) => {
    if (!isNavigationNeeded(to, options, location)) {
      return;
    }

    const isNewHistoryEntry = isNewHistoryEntryNeeded(to, options, location);

    const optionsState = options?.state as HistoryState | undefined;
    const state: HistoryState = optionsState ?? {
      environmentId: config.environment?.id,
      spanCodeObjectId: config.scope?.span?.spanCodeObjectId
    };

    const resolvedPath = resolvePath(to, location?.location.pathname ?? "/");
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
