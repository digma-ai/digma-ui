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

const isNavigationNeeded = (
  to: To,
  options: NavigateOptions | undefined,
  location: Location<{
    idx: number;
    environmentId?: string;
    spanCodeObjectId?: string;
  } | null>
) => {
  const optionsState = options?.state as
    | { environmentId?: string; spanCodeObjectId?: string }
    | undefined;

  if (optionsState) {
    return (
      Boolean(
        optionsState.environmentId &&
          optionsState.environmentId !== location.state?.environmentId
      ) || optionsState.spanCodeObjectId !== location.state?.spanCodeObjectId
    );
  }

  const newResolvedPath = resolvePath(to, location.pathname);

  if (isString(to)) {
    return location.pathname !== newResolvedPath.pathname;
  }

  return (
    location.pathname !== newResolvedPath.pathname ||
    location.search !== to.search
  );
};

export const useHistoryNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation() as Location<{
    idx: number;
    environmentId?: string;
    spanCodeObjectId?: string;
  } | null>;
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
        idx: options?.replace ? currentIndex : currentIndex + 1
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
