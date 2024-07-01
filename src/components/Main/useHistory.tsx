import { useContext } from "react";
import { NavigateOptions, To, resolvePath } from "react-router-dom";
import { history } from "../../containers/Main/history";
import { HistoryEntry, HistoryEntryLocation } from "../../history/History";
import { isObject } from "../../typeGuards/isObject";
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

  return (
    isLocationChanged(to, location.location) ||
    isEnvironmentChanged(optionsState, location.state) ||
    isScopeChanged(optionsState, location.state)
  );
};

const isNewHistoryEntryNeeded = (options: NavigateOptions | undefined) => {
  return !options?.replace;
};

export const useHistory = () => {
  const location = history.getCurrentLocation();
  const config = useContext(ConfigContext);

  const goTo = (to: To, options?: NavigateOptions) => {
    if (!isNavigationNeeded(to, options, location)) {
      return;
    }

    const isNewHistoryEntry = isNewHistoryEntryNeeded(options);

    const state: HistoryState = {
      environmentId:
        isObject(options) &&
        isObject(options.state) &&
        isString(options.state.environmentId)
          ? options.state.environmentId
          : config.environment?.id,
      spanCodeObjectId:
        isObject(options) &&
        isObject(options.state) &&
        isString(options.state.spanCodeObjectId)
          ? options.state.spanCodeObjectId
          : config.scope?.span?.spanCodeObjectId
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
