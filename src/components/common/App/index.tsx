import { ErrorInfo, useContext, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "styled-components";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { Theme } from "../../../globals";
import { logger } from "../../../logging";
import { useStore } from "../../../store/useStore";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isNull } from "../../../typeGuards/isNull";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { sendErrorTrackingEvent } from "../../../utils/actions/sendErrorTrackingEvent";
import { ErrorScreen } from "../ErrorScreen";
import { ConfigContext } from "./ConfigContext";
import { getStyledComponentsTheme } from "./getTheme";
import { GlobalStyle } from "./styles";
import {
  AppProps,
  BackendInfo,
  DigmaStatus,
  Environment,
  InsightStats,
  PersistedState,
  RunConfiguration,
  Scope,
  UserInfo
} from "./types";

export const THEMES = ["light", "dark", "dark-jetbrains"];

export const isBackendInfo = (info: unknown): info is BackendInfo =>
  isObject(info) &&
  isString(info.applicationVersion) &&
  isString(info.deploymentType);

const isTheme = (theme: unknown): theme is Theme =>
  isString(theme) && THEMES.includes(theme);

export const isDigmaStatus = (status: unknown): status is DigmaStatus =>
  isObject(status) &&
  isObject(status.connection) &&
  (isString(status.connection.type) || isNull(status.connection.type)) &&
  Array.isArray(status.runningDigmaInstances);

const getTheme = (): Theme => {
  if (!isTheme(window.theme)) {
    const bodyEl = document.getElementsByTagName("body");
    const vscodeTheme =
      bodyEl[0].dataset.vscodeThemeKind === "vscode-light" ? "light" : "dark";
    return vscodeTheme;
  }

  return window.theme;
};

const defaultMainFont = isString(window.mainFont) ? window.mainFont : "";
const defaultCodeFont = isString(window.codeFont) ? window.codeFont : "";

export const App = ({ theme, children, id }: AppProps) => {
  const [currentTheme, setCurrentTheme] = useState(theme ?? getTheme());
  const [mainFont, setMainFont] = useState(defaultMainFont);
  const [codeFont, setCodeFont] = useState(defaultCodeFont);
  const [config, setConfig] = useState(useContext(ConfigContext));
  const {
    setJaegerURL,
    setIsJaegerEnabled,
    setIsDigmaEngineInstalled,
    setIsDigmaEngineRunning,
    setDigmaStatus,
    setIsDockerInstalled,
    setIsDockerComposeInstalled,
    setDigmaApiUrl,
    setUserRegistrationEmail,
    setIsObservabilityEnabled,
    setBackendInfo,
    setEnvironments,
    setEnvironment,
    setScope,
    setUserInfo,
    setInsightStats,
    setRunConfig,
    setIsDigmathonGameFinished,
    setIsMicrometerProject
  } = useStore.getState();

  const handleError = (error: Error, info: ErrorInfo) => {
    logger.error(error, info);
    sendErrorTrackingEvent(error, {
      severity: "high",
      level: "App react component",
      app: id
    });
  };

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const handleSetTheme = (data: unknown) => {
      if (isObject(data) && isTheme(data.theme)) {
        setCurrentTheme(data.theme);
      }
    };

    const handleSetMainFont = (data: unknown) => {
      if (isObject(data) && isString(data.mainFont)) {
        setMainFont(data.mainFont);
      }
    };

    const handleSetCodeFont = (data: unknown) => {
      if (isObject(data) && isString(data.codeFont)) {
        setCodeFont(data.codeFont);
      }
    };

    const handleSetJaegerURL = (data: unknown) => {
      if (isObject(data) && isString(data.jaegerURL)) {
        setConfig((config) => ({
          ...config,
          jaegerURL: data.jaegerURL as string
        }));
        setJaegerURL(data.jaegerURL);
      }
    };

    const handleSetIsJaegerEnabled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isJaegerEnabled)) {
        setConfig((config) => ({
          ...config,
          isJaegerEnabled: data.isJaegerEnabled as boolean
        }));
        setIsJaegerEnabled(data.isJaegerEnabled);
      }
    };

    const handleSetIsDigmaEngineInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmaEngineInstalled)) {
        setConfig((config) => ({
          ...config,
          isDigmaEngineInstalled: data.isDigmaEngineInstalled as boolean
        }));
        setIsDigmaEngineInstalled(data.isDigmaEngineInstalled);
      }
    };

    const handleSetIsDigmaEngineRunning = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmaEngineRunning)) {
        setConfig((config) => ({
          ...config,
          isDigmaEngineRunning: data.isDigmaEngineRunning as boolean
        }));
        setIsDigmaEngineRunning(data.isDigmaEngineRunning);
      }
    };

    const handleSetDigmaStatus = (data: unknown) => {
      if (isDigmaStatus(data)) {
        setConfig((config) => ({
          ...config,
          digmaStatus: data
        }));
        setDigmaStatus(data);
      }
    };

    const handleSetIsDockerInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDockerInstalled)) {
        setConfig((config) => ({
          ...config,
          isDockerInstalled: data.isDockerInstalled as boolean
        }));
        setIsDockerInstalled(data.isDockerInstalled);
      }
    };

    const handleSetIsDockerComposeInstalled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDockerComposeInstalled)) {
        setConfig((config) => ({
          ...config,
          isDockerComposeInstalled: data.isDockerComposeInstalled as boolean
        }));
        setIsDockerComposeInstalled(data.isDockerComposeInstalled);
      }
    };

    const handleSetDigmaApiUrl = (data: unknown) => {
      if (isObject(data) && isString(data.url)) {
        setConfig((config) => ({
          ...config,
          digmaApiUrl: data.url as string
        }));
        setDigmaApiUrl(data.url);
      }
    };

    const handleSetUserRegistrationEmail = (data: unknown) => {
      if (isObject(data) && isString(data.email)) {
        setConfig((config) => ({
          ...config,
          userRegistrationEmail: data.email as string
        }));
        setUserRegistrationEmail(data.email);
      }
    };

    const handleIsObservabilityEnabled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isObservabilityEnabled)) {
        setConfig((config) => ({
          ...config,
          isObservabilityEnabled: data.isObservabilityEnabled as boolean
        }));
        setIsObservabilityEnabled(data.isObservabilityEnabled);
      }
    };

    const handleSetBackendInfo = (data: unknown) => {
      if (isBackendInfo(data)) {
        setConfig((config) => ({
          ...config,
          backendInfo: data
        }));
        setBackendInfo(data);
      }
    };

    const handleSetEnvironments = (data: unknown) => {
      if (isObject(data) && Array.isArray(data.environments)) {
        setConfig((config) => {
          const environments = data.environments as Environment[];
          const environment = environments.find(
            (x) => x.id === config.environment?.id
          );

          return {
            ...config,
            environments,
            environment
          };
        });
        setEnvironments(data.environments as Environment[]);
      }
    };

    const handleSetIsMicrometerProject = (data: unknown) => {
      if (isObject(data)) {
        setConfig((config) => ({
          ...config,
          isMicrometerProject: data.isMicrometerProject as boolean
        }));
        setIsMicrometerProject(data.isMicrometerProject as boolean);
      }
    };

    const handleSetScope = (data: unknown) => {
      setConfig((config) => {
        const scope = data as Scope;
        const environment = scope.environmentId
          ? config.environments?.find((x) => x.id === scope.environmentId)
          : config.environment;

        setScope(scope);
        setEnvironment(environment ?? null);

        return {
          ...config,
          scope,
          environment
        };
      });
    };

    const handleSetUserInfo = (data: unknown) => {
      setConfig((config) => ({
        ...config,
        userInfo: data as UserInfo
      }));

      setUserInfo(data as UserInfo);
    };

    const handleSetInsightStats = (data: unknown) => {
      setConfig((config) => ({
        ...config,
        insightStats: data as InsightStats
      }));
      setInsightStats(data as InsightStats);
    };

    const handleSetState = (data: unknown) => {
      setConfig((config) => ({
        ...config,
        state: data as PersistedState
      }));
    };

    const handleSetIsDigmathonModeEnabled = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmathonModeEnabled)) {
        setConfig((config) => ({
          ...config,
          isDigmathonModeEnabled: data.isDigmathonModeEnabled as boolean
        }));
      }
    };

    const handleSetProductKey = (data: unknown) => {
      if (isObject(data) && isString(data.productKey)) {
        setConfig((config) => ({
          ...config,
          productKey: data.productKey as string
        }));
      }
    };

    const handleIsDigmathonGameFinished = (data: unknown) => {
      if (isObject(data) && isBoolean(data.isDigmathonGameFinished)) {
        setConfig((config) => ({
          ...config,
          isDigmathonGameFinished: data.isDigmathonGameFinished as boolean
        }));
      }
      setIsDigmathonGameFinished(data as boolean);
    };

    const handleSetRunConfiguration = (data: unknown) => {
      setConfig((config) => ({
        ...config,
        runConfig: data as RunConfiguration
      }));
      setRunConfig(data as RunConfiguration);
    };

    dispatcher.addActionListener(actions.SET_THEME, handleSetTheme);
    dispatcher.addActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
    dispatcher.addActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
    dispatcher.addActionListener(actions.SET_JAEGER_URL, handleSetJaegerURL);
    dispatcher.addActionListener(actions.SET_STATE, handleSetState);
    dispatcher.addActionListener(actions.SET_USER_INFO, handleSetUserInfo);
    dispatcher.addActionListener(
      actions.SET_IS_JAEGER_ENABLED,
      handleSetIsJaegerEnabled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DIGMA_ENGINE_INSTALLED,
      handleSetIsDigmaEngineInstalled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DIGMA_ENGINE_RUNNING,
      handleSetIsDigmaEngineRunning
    );
    dispatcher.addActionListener(
      actions.SET_DIGMA_STATUS,
      handleSetDigmaStatus
    );
    dispatcher.addActionListener(
      actions.SET_IS_DOCKER_INSTALLED,
      handleSetIsDockerInstalled
    );
    dispatcher.addActionListener(
      actions.SET_IS_DOCKER_COMPOSE_INSTALLED,
      handleSetIsDockerComposeInstalled
    );
    dispatcher.addActionListener(
      actions.SET_DIGMA_API_URL,
      handleSetDigmaApiUrl
    );
    dispatcher.addActionListener(
      actions.SET_USER_REGISTRATION_EMAIL,
      handleSetUserRegistrationEmail
    );
    dispatcher.addActionListener(
      actions.SET_IS_OBSERVABILITY_ENABLED,
      handleIsObservabilityEnabled
    );
    dispatcher.addActionListener(
      actions.SET_BACKEND_INFO,
      handleSetBackendInfo
    );
    dispatcher.addActionListener(
      actions.SET_ENVIRONMENTS,
      handleSetEnvironments
    );
    dispatcher.addActionListener(
      actions.SET_IS_MICROMETER_PROJECT,
      handleSetIsMicrometerProject
    );
    dispatcher.addActionListener(actions.SET_SCOPE, handleSetScope);
    dispatcher.addActionListener(
      actions.SET_INSIGHT_STATS,
      handleSetInsightStats
    );
    dispatcher.addActionListener(
      actions.SET_DIGMATHON_MODE,
      handleSetIsDigmathonModeEnabled
    );
    dispatcher.addActionListener(actions.SET_PRODUCT_KEY, handleSetProductKey);
    dispatcher.addActionListener(
      actions.SET_IS_DIGMATHON_GAME_FINISHED,
      handleIsDigmathonGameFinished
    );
    dispatcher.addActionListener(
      actions.SET_RUN_CONFIGURATION,
      handleSetRunConfiguration
    );

    return () => {
      dispatcher.removeActionListener(actions.SET_THEME, handleSetTheme);
      dispatcher.removeActionListener(actions.SET_MAIN_FONT, handleSetMainFont);
      dispatcher.removeActionListener(actions.SET_CODE_FONT, handleSetCodeFont);
      dispatcher.removeActionListener(actions.SET_STATE, handleSetState);
      dispatcher.removeActionListener(actions.SET_USER_INFO, handleSetUserInfo);
      dispatcher.removeActionListener(
        actions.SET_JAEGER_URL,
        handleSetJaegerURL
      );
      dispatcher.removeActionListener(
        actions.SET_IS_JAEGER_ENABLED,
        handleSetIsJaegerEnabled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DIGMA_ENGINE_INSTALLED,
        handleSetIsDigmaEngineInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DIGMA_ENGINE_RUNNING,
        handleSetIsDigmaEngineRunning
      );
      dispatcher.removeActionListener(
        actions.SET_DIGMA_STATUS,
        handleSetDigmaStatus
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DOCKER_INSTALLED,
        handleSetIsDockerInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DOCKER_COMPOSE_INSTALLED,
        handleSetIsDockerComposeInstalled
      );
      dispatcher.removeActionListener(
        actions.SET_DIGMA_API_URL,
        handleSetDigmaApiUrl
      );
      dispatcher.removeActionListener(
        actions.SET_USER_REGISTRATION_EMAIL,
        handleSetUserRegistrationEmail
      );
      dispatcher.removeActionListener(
        actions.SET_IS_OBSERVABILITY_ENABLED,
        handleIsObservabilityEnabled
      );
      dispatcher.removeActionListener(
        actions.SET_BACKEND_INFO,
        handleSetBackendInfo
      );
      dispatcher.removeActionListener(
        actions.SET_ENVIRONMENTS,
        handleSetEnvironments
      );
      dispatcher.removeActionListener(
        actions.SET_IS_MICROMETER_PROJECT,
        handleSetIsMicrometerProject
      );
      dispatcher.removeActionListener(actions.SET_SCOPE, handleSetScope);
      dispatcher.removeActionListener(
        actions.SET_INSIGHT_STATS,
        handleSetInsightStats
      );
      dispatcher.removeActionListener(
        actions.SET_DIGMATHON_MODE,
        handleSetIsDigmathonModeEnabled
      );
      dispatcher.removeActionListener(
        actions.SET_PRODUCT_KEY,
        handleSetProductKey
      );
      dispatcher.removeActionListener(
        actions.SET_IS_DIGMATHON_GAME_FINISHED,
        handleIsDigmathonGameFinished
      );
      dispatcher.removeActionListener(
        actions.SET_RUN_CONFIGURATION,
        handleSetRunConfiguration
      );
    };
  }, []);

  const styledComponentsTheme = getStyledComponentsTheme(
    currentTheme,
    mainFont,
    codeFont
  );

  return (
    <ConfigContext.Provider value={config}>
      <ThemeProvider theme={styledComponentsTheme}>
        <GlobalStyle />
        <ErrorBoundary fallback={<ErrorScreen />} onError={handleError}>
          {children}
        </ErrorBoundary>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};
