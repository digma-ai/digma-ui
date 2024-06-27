import { useContext } from "react";
import {
  Location,
  NavigateOptions,
  To,
  resolvePath,
  useLocation,
  useNavigate
} from "react-router-dom";
import { isObject } from "../../typeGuards/isObject";
import { isString } from "../../typeGuards/isString";
import { ConfigContext } from "../common/App/ConfigContext";
import { GoToState, LocationState } from "./types";

const isLocationChanged = (to: To, location: Location) => {
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
  optionsState: GoToState | undefined,
  locationState: LocationState | null
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
  optionsState: GoToState | undefined,
  locationState: LocationState | null
) => {
  if (!optionsState) {
    return false;
  }

  return optionsState.spanCodeObjectId !== locationState?.spanCodeObjectId;
};

const isNavigationNeeded = (
  to: To,
  options: NavigateOptions | undefined,
  location: Location<LocationState | null>
) => {
  const optionsState = options?.state as GoToState | undefined;

  return (
    isLocationChanged(to, location) ||
    isEnvironmentChanged(optionsState, location.state) ||
    isScopeChanged(optionsState, location.state)
  );
};

const isNewHistoryEntryNeeded = (
  to: To,
  options: NavigateOptions | undefined,
  location: Location<LocationState | null>
) => {
  if (options?.replace) {
    return false;
  }

  const optionsState = options?.state as GoToState | undefined;

  if (
    !isLocationChanged(to, location) &&
    !isScopeChanged(optionsState, location.state)
  ) {
    return false;
  }

  return true;
};

export const useHistoryNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation() as Location<LocationState | null>;
  const config = useContext(ConfigContext);
  const currentIndex = location.state?.idx ?? 0;
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < window.history.length - 1;

  const goTo = (to: To, options?: NavigateOptions) => {
    if (!isNavigationNeeded(to, options, location)) {
      return;
    }

    navigate(to, {
      ...options,
      state: {
        ...(isObject(options) && isObject(options.state) ? options.state : {}),
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
            : config.scope?.span?.spanCodeObjectId,
        idx: isNewHistoryEntryNeeded(to, options, location)
          ? currentIndex + 1
          : currentIndex
      }
    });
  };

  return {
    goTo,
    canGoBack,
    canGoForward,
    goBack: () => (canGoBack ? navigate(-1) : undefined),
    goForward: () => (canGoForward ? navigate(1) : undefined)
  };
};
